let state = {
  modalVisible: false,
  phoneNum: '',
  phonePrefix: '',
};

const getPhoneData = () => {
  return Promise.resolve({
    phoneNum: '18516560324',
    phonePrefix: '+86',
  });
}

const bankup = (event) => {
  return Promise.resolve({ re: 200 });
}

const init = () => {
  getPhoneData().then((phoneData) => {
    state = {
      ...phoneData,
      ...state
    }
    renderPhone();
  })
}

function toggleAgree(event) {
  let { agree } = state;
  state.agree = !agree;
  renderCheckbox('.agree input', state.agree);
}

function toggleAttachment(event) {
  let { attachment } = state;
  state.attachment = !attachment;
  renderCheckbox('.attachment input', state.attachment);
}

function toggleModal(event) {
  let { modalVisible } = state;
  let modal = document.querySelector('.modal');
  if (modalVisible) {
    modal.classList.add('visible');
  } else {
    modal.classList.remove('visible');
  }
  state.modalVisible = !modalVisible;
}

function showToast() {
  let { toastVisible } = state;
  let toast = document.querySelector('.toast');
  if (toastVisible) {
    toast.classList.add('visible-inline');
  } else {
    toast.classList.remove('visible-inline');
  }
  state.toastVisible = !toastVisible;
}

function renderPhone() {
  let { phonePrefix, phoneNum } = state;
  let $phonePrefix = document.querySelector('.phone span:first-child');
  let $phoneNum = document.querySelector('.phone span:last-child');
  $phonePrefix.innerText = phonePrefix;
  $phoneNum.innerText = phoneNum;
}

function renderCheckbox(cls, val) {
  let $target = document.querySelector(cls);
  $target.value = val;
}