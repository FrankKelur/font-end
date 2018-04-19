import en from 'element-ui/lib/locale/lang/en'
import cn from 'element-ui/lib/locale/lang/zh-CN'
import ct from 'element-ui/lib/locale/lang/zh-TW'
import Vue from 'vue'
import locale from 'element-ui/lib/locale'

import {
  Pagination,
  Dialog,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Tree,
  Alert,
  Slider,
  Icon,
  Row,
  Col,
  Upload,
  Progress,
  Spinner,
  Badge,
  Card,
  Rate,
  Steps,
  Step,
  Carousel,
  Scrollbar,
  CarouselItem,
  Collapse,
  CollapseItem,
  Cascader,
  ColorPicker,
  Loading,
  MessageBox,
  Message,
  Transfer,
  Notification
} from 'element-ui'

Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Autocomplete)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(TimePicker)
Vue.use(Popover)
Vue.use(Tooltip)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Alert)
Vue.use(Slider)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)
Vue.use(Progress)
Vue.use(Spinner)
Vue.use(Badge)
Vue.use(Card)
Vue.use(Rate)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Carousel)
Vue.use(Scrollbar)
Vue.use(CarouselItem)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Cascader)
Vue.use(ColorPicker)
Vue.use(Transfer)

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message

var langMap = {
  'en': en,
  'zh-CN': cn,
  'zh-TW': ct
}

Vue.directive('ellipsis-title', {
  bind (el, binding, vnode) {
    el.classList.add('ellipsis-title')
    el.onmouseenter = function () {
      // console.log('onmouseenter', el)
      // console.log('el.innerHTML', el.innerHTML)
      // console.log('binding', binding)
      // console.log('vnode', vnode)
      if (el.clientWidth < el.scrollWidth) {
        el.title = el.innerHTML
      } else {
        el.title = ''
      }
    }
  }
})

var defaultHandler = {
  dragover (event) {
    event.preventDefault()
  },
  dragenter (event) {
    var el = event.target
    var targetIdx = parseInt(el.getAttribute('idx'))
    var idx = parseInt(event.dataTransfer.getData('sourceIdx'))
    var origin = event.dataTransfer.getData('origin')
    if (el.getAttribute('dropable') && (origin !== 'middle' || targetIdx !== idx)) { // 自身不允许拖放到自身
      el.className += ' dragenter theme-border-D'
    }
  },
  dragleave (event) {
    var el = event.target
    try { el.className = el.className.replace(/dragenter/g, '').replace(/theme\\-border\\-D/g, '') } catch (ex) {}
  }
  // ,
  // getDropableEle (target) {
  //   while (!target.getAttribute('dropable')) {
  //     target = target.parentNode
  //   }
  //   console.log('target', target)
  //   return target
  // }
}

Vue.directive('draggable', {
  bind (el, binding, vnode) {
    el.className += ' draggable-item'
    var handler = Object.assign(defaultHandler, binding.value)
    el.setAttribute('draggable', true)
    el.addEventListener('dragstart', handler.dragstart)
  }
})

Vue.directive('dropable', {
  bind (el, binding, vnode) {
    var handler = Object.assign(defaultHandler, binding.value)
    el.setAttribute('dropable', true)
    el.addEventListener('dragenter', handler.dragenter)
    el.addEventListener('dragleave', handler.dragleave)
    el.addEventListener('dragover', handler.dragover)
    el.addEventListener('drop', handler.drop)
  }
})

locale.use(langMap[window.renderData.user_setting.lang])
