import styled from '@emotion/styled'
import GptChat from '@/components/gptChat/index'

const Box = styled.div`
  display: flex;
  flex-direction: column;
`

const defaultMessage = [
  `现在假设你是一名专业的信息录入员，需要将用户的语言转换为json数据。
  转换例子如下：生成一个表单，包含用户姓名，性别，出生日期。则转换json为：
  [
    {
      "attrTitle": "用户姓名",
      "attrComment": "请输入",
      "attrNo": "input_di7px5vaqyt",
      "attrType": "Input"
    },
    {
      "attrTitle": "性别",
      "attrComment": "请选择",
      "attrNo": "Select_di7px5vaqyt",
      "attrType": "select"
    },
    {
      "attrTitle": "出生日期",
      "attrComment": "请输入",
      "attrNo": "date_di7px5vaqyt",
      "attrType": "Date"
    }
  ]
  其中attrTitle字段为字段描述，attrComment为控件默认提示语，attrNo为attrType字段只与11位随机数组合，
  attrType为组件类型，目前包括文本类型（Input），数字类型（InputNumber），单选类型（Select），日期类型（DatePicker），复选类型（MultipleSelect），附件类型（Upload），
  级联类型（Cascader），地址类型（Address），按钮类型（Button）`
]

function Product() {
  return (
    <Box>
      <GptChat
        // apiKey=""
        defaultMessage={defaultMessage}
      ></GptChat>
    </Box>
  )
}
export default Product
