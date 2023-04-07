import { useCallback, useEffect, useMemo, useState, useRef } from 'react'
import styled from '@emotion/styled'
import { Input, Avatar, Button, List, message } from 'antd'
const { Configuration, OpenAIApi } = require('openai')

// 模拟gpt返回信息
const mockMessage = {
  id: 'chatcmpl-abc123',
  object: 'chat.completion',
  created: 1677858242,
  model: 'gpt-3.5-turbo-0301',
  usage: {
    prompt_tokens: 13,
    completion_tokens: 7,
    total_tokens: 20
  },
  choices: [
    {
      message: {
        role: 'assistant',
        content:
          '\n\n目前这种方式适合小规模使用，如果需要大规模多人使用，整体的架构要重新设计哦~不过看到这篇文章并且想自己动手做的人，应该都是小规模用。'
      },
      finish_reason: 'stop',
      index: 0
    }
  ]
}

const { TextArea } = Input

const Box = styled.div`
  display: flex;
  flex-direction: column;
`
const ChatBox = styled.div`
  height: 450px;
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

const emptyArray = []

function Product({
  apiKey,
  defaultMessage = emptyArray,
  gptPhoto = 'https://randomuser.me/api/portraits/men/46.jpg',
  userPhoto = 'https://randomuser.me/api/portraits/women/71.jpg'
}) {
  const [value, setValue] = useState('')
  const [questions, setQuestions] = useState([])
  const [result, setResult] = useState([])
  const [disabled, setDisabled] = useState(false)
  const aiRef = useRef(null)
  useEffect(() => {
    if (apiKey && aiRef.current === null) {
      const configuration = new Configuration({
        apiKey
      })
      const openai = new OpenAIApi(configuration)
      aiRef.current = openai
    }
  }, [apiKey])

  const sendGpt = useCallback(async (messages) => {
    const { current } = aiRef
    if (!current) {
      return mockMessage
    }
    const { data } = await current.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages
    })
    return data
  }, [])

  const send = useCallback(async () => {
    if (value.trim() === '') {
      return message.error('请输入内容')
    }
    setDisabled(true)
    const preArr =
      questions.length > 0
        ? questions
        : defaultMessage.map((m) =>
            typeof m === 'object'
              ? m
              : {
                  role: 'user',
                  content: m
                }
          )
    const nextQuestions = [
      ...preArr,
      {
        role: 'user',
        content: value
      }
    ]
    const data = await sendGpt(nextQuestions)
    const { id, choices } = data
    const { message: msg } =
      Array.isArray(choices) && choices.length > 0 ? choices[0] : {}
    setQuestions(nextQuestions)
    setResult((pre) => [...pre, { ...msg, id }])
    setDisabled(false)
    setValue('')
  }, [value, questions, sendGpt, defaultMessage])

  const showContent = useMemo(
    () =>
      questions
        .map(({ role, content }, index) => {
          const { id, ...other } = result[index] || {}
          return id
            ? [
                {
                  role,
                  content,
                  id,
                  photo: gptPhoto
                },
                {
                  id,
                  ...other,
                  photo: userPhoto
                }
              ]
            : [{ role, content, id: Date.now() }]
        })
        .reduce((pre, [q, a]) => (a ? [...pre, q, a] : [...pre, q]), []),
    [questions, result, gptPhoto, userPhoto]
  )
  return (
    <Box>
      <ChatBox>
        <List
          itemLayout="horizontal"
          dataSource={showContent}
          renderItem={({ photo, role, content, id }, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={photo} />}
                title={role}
                description={content}
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
            placeholder="我是全知全能神，你有什么困惑？"
          ></TextArea>
        </LeftBox>
        <RightBox>
          <Button disabled={disabled} type="primary" onClick={send}>
            send
          </Button>
        </RightBox>
      </InputBox>
    </Box>
  )
}
export default Product
