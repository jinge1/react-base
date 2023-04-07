import { useCallback, useEffect, useMemo, useState } from 'react'
import styled from '@emotion/styled'
import { Input, Avatar, Button, List, message, Drawer } from 'antd'

// 模拟gpt返回信息
// const mockMessage = {
//   role: 'assistant',
//   id: 'chatcmpl-72VibjUUeSINw3rn5LQfYEUAqoLnS',
//   parentMessageId: '154f6ec1-b345-4965-92c3-f889212b4fba',
//   text: '在JavaScript中，JSON.parse函数解析JSON字符串时，如果字符串中包含回车字符（\\n），则可能会导致语法错误。为了解决这个问题，可以使用String.prototype.replace()方法将回车字符替换为空字符串，然后再进行解析。\n\n例如，假设我们有以下JSON字符串：\n\n```\nvar jsonString = \'{"name": "John",\\n "age": 30}\';\n```\n\n在这个字符串中，第二行的回车字符可能会导致JSON解析错误。为了解决这个问题，我们可以使用以下代码：\n\n```\nvar fixedJsonString = jsonString.replace(/\\n/g, "");\nvar jsonObj = JSON.parse(fixedJsonString);\n```\n\n在这个例子中，我们使用正则表达式`/\\n/g`匹配所有回车字符，并使用空字符串替换它们。然后，我们可以使用JSON.parse()函数解析修正后的JSON字符串。',
//   detail: {
//     id: 'chatcmpl-72VibjUUeSINw3rn5LQfYEUAqoLnS',
//     object: 'chat.completion.chunk',
//     created: 1680832937,
//     model: 'gpt-3.5-turbo-0301',
//     choices: [
//       {
//         delta: {},
//         index: 0,
//         finish_reason: 'stop'
//       }
//     ]
//   }
// }

// 获取缓存数据
const getLocalInfo = () => {
  const parentMessageId = localStorage.getItem('parentMessageId')
  const Authorization = localStorage.getItem('Authorization')
  return parentMessageId
    ? {
        Authorization,
        options: { parentMessageId }
      }
    : {
        Authorization
      }
}

// 获取字符传中包含的json数据块字符串
function extractJsonArray(str) {
  const regex = /{.*}/g
  try {
    const matches = str.replace(/\n/g, '').match(regex)
    return Array.isArray(matches)
      ? matches.map((match) => JSON.parse(match.replace(/\n/g, '')))
      : []
  } catch (e) {
    return []
  }
}

// 发送数据
const sendGpt = async (msg, systemMessage = '') => {
  const { Authorization, ...other } = getLocalInfo()
  if (!Authorization) {
    throw new Error('Authorization 不存在，请先设置')
  }
  const res = await fetch('http:/api/chat-process', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization
    },
    body: JSON.stringify({
      prompt: msg,
      systemMessage,
      ...other
    })
  })
  const result = await res.text()
  const arr = result.split('\n').map((s) => JSON.parse(s))
  const info = arr.length > 0 ? arr[arr.length - 1] : {}
  return info
}

const { TextArea } = Input

const Box = styled.div`
  display: flex;
  flex-direction: column;
`
const ChatBox = styled.div`
  max-height: 450px;
  overflow: auto;
  margin-bottom: 20px;
`
const InputBox = styled.div`
  display: flex;
`

const LeftBox = styled.div`
  flex: 1;
`

const RightBox = styled.div``

const FixBox = styled.div`
  position: fixed;
  right: 20px;
  top: 100px;
  z-index: 6;
`

const emptyArray = []

function ChatContent({
  defaultMessage = emptyArray,
  Authorization,
  callback,
  gptPhoto = 'https://img0.baidu.com/it/u=664228060,2961772095&fm=253&fmt=auto&app=120&f=PNG?w=192&h=192',
  userPhoto = 'https://img0.baidu.com/it/u=2448713848,460800303&fm=253&fmt=auto&app=138&f=JPEG?w=200&h=200',
  systemMessage = 'You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible.\nKnowledge cutoff: 2021-09-01\nCurrent date: 2023-04-07'
}) {
  const [value, setValue] = useState('')
  const [questions, setQuestions] = useState([])
  const [result, setResult] = useState([])
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    const init = async () => {
      if (Authorization) {
        localStorage.setItem('Authorization', Authorization)
      }
      // 先设置角色(如果已经设定过，会存在覆盖问题)
      if (defaultMessage) {
        setDisabled(true)
        localStorage.removeItem('parentMessageId')
        const { parentMessageId } = await sendGpt(defaultMessage, systemMessage)
        localStorage.setItem('parentMessageId', parentMessageId)
        setDisabled(false)
      }
    }
    init()
  }, [defaultMessage, systemMessage, Authorization])

  const send = useCallback(async () => {
    if (value.trim() === '') {
      return message.error('请输入内容')
    }
    setDisabled(true)

    setQuestions([...questions, { role: 'user', content: value }])
    setResult([...result, { loading: true, role: 'assistant' }])
    const {
      id,
      role,
      parentMessageId,
      text = ''
    } = await sendGpt(value, systemMessage)
    const parentInfo = parentMessageId ? { parentMessageId } : {}
    setQuestions([
      ...questions,
      { role: 'user', content: value, id, ...parentInfo }
    ])
    setResult([...result, { content: text, id, role, ...parentInfo }])
    setDisabled(false)
    setValue('')
    if (typeof callback === 'function') {
      callback({ params: extractJsonArray(text), text })
    }
  }, [value, questions, result, systemMessage, callback])

  const showContent = useMemo(
    () =>
      questions
        .map((q) => {
          const answer = result.find((r) => r.id === q.id)
          return answer ? [q, answer] : [q]
        })
        .reduce((pre, [q, a]) => (a ? [...pre, q, a] : [...pre, q]), []),
    [questions, result]
  )
  return (
    <Box>
      <ChatBox>
        <List
          itemLayout="horizontal"
          dataSource={showContent}
          renderItem={({ role, loading = false, content }) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={role === 'user' ? userPhoto : gptPhoto} />}
                title={role}
                description={loading ? 'loading……' : content}
              />
            </List.Item>
          )}
        />
      </ChatBox>
      <InputBox>
        <LeftBox style={{ marginRight: 20 }}>
          <TextArea
            rows={3}
            value={value}
            onChange={({ target }) => setValue(target.value)}
            placeholder="有任何问题都可以咨询，比如：帮我创建一个表单，包含产品名称，上市日期，产品图片。"
          ></TextArea>
        </LeftBox>
        <RightBox>
          <Button disabled={disabled} type="primary" onClick={send}>
            {disabled ? 'loading……' : '提交'}
          </Button>
        </RightBox>
      </InputBox>
    </Box>
  )
}

const Chat = (props) => {
  const { type } = props
  const [open, setOpen] = useState(false)
  return type === 'button' ? (
    <>
      <FixBox>
        <Button type="primary" onClick={() => setOpen(true)}>
          AI对话
        </Button>
      </FixBox>
      <Drawer
        title="ai对话框"
        placement="right"
        width={800}
        onClose={() => setOpen(false)}
        open={open}
      >
        <ChatContent {...props}></ChatContent>
      </Drawer>
    </>
  ) : (
    <ChatContent {...props}></ChatContent>
  )
}

export default Chat
