import { useCallback, useEffect, useMemo, useState } from 'react'
import styled from '@emotion/styled'
import { Input, Avatar, Button, List, message } from 'antd'
const { Configuration, OpenAIApi } = require('openai')

const apiKey = ''

const configuration = new Configuration({
  apiKey
})
const openai = new OpenAIApi(configuration)

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

const sendGpt = async (messages) => {
  const { data } = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages
  })
  return data
}

function Product() {
  const [value, setValue] = useState('')
  const [questions, setQuestions] = useState([])
  const [result, setResult] = useState([])
  const [disabled, setDisabled] = useState(false)
  const send = useCallback(async () => {
    if(!apiKey){
      return message.error('apiKey不存在')
    }
    if (value.trim() === '') {
      return message.error('请输入内容')
    }
    setDisabled(true)
    const nextQuestions = [
      ...questions,
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
  }, [value, questions])

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
                  photo: 'https://randomuser.me/api/portraits/men/46.jpg'
                },
                {
                  id,
                  ...other,
                  photo: 'https://randomuser.me/api/portraits/women/71.jpg'
                }
              ]
            : [{ role, content, id: Date.now() }]
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
            rows={5}
            value={value}
            onChange={({ target }) => setValue(target.value)}
            placeholder="说出你心中的困惑，我将为你解答"
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
