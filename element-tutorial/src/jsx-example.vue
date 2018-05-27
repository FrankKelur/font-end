<script>
import BIcon from './b-icon.vue'
export default {
  render (h) {
    return (<div id='foo'><b-icon></b-icon><span>bar</span></div>)
  },
  components: {BIcon}
}
</script>

<style scoped>
    img {
        width: 20px;
        height: 20px;
    }
</style>