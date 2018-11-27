<template>
  <div class="home">
    <div class="input-container">
      <div v-if="error != ''">{{error}}</div>
      <div class="input-group">
        <button
          @click="getIssues"
          type="submit">
            Get Issues
        </button>
      </div>
      <div>{{issues}}</div>
      <div v-if="comments != ''">{{comments}}</div>
    </div>
  </div>
</template>

<script>
import WordService from '@/services/WordService'
export default {
  name: 'Home',
  data () {
    return {
      issues: '',
      comments: '',
      error: ''
    }
  },
  methods: {
    async getIssues () {
      var self = this
      var commentsResponse = ''
      /*const response = await WordService.getIssues({
        owner: 'bitcoin',
        repo: 'bitcoin'
      })*/

      WordService.getIssues({
        owner: 'bitcoin',
        repo: 'bitcoin'
      }).then(async function (response) {
        let responses = response.data
        self.issues = responses[0]
        WordService.getCommentsForIssue({
          owner: 'bitcoin',
          repo: 'bitcoin',
          number: response.data[2].number
        }).then(function (response) {
          commentsResponse = response.data
          console.log(commentsResponse)
          self.comments = commentsResponse[0]
        })
      })


      /*const comments = await WordService.getCommentsForIssue({
        owner: 'bitcoin',
        repo: 'bitcoin',
        number: response.data[0].number
      })*/

      //console.log(response)
      //console.log(comments)

      /*let responses = response.data

      if (responses.length === 0) {
        this.error = 'Issues could not be loaded.'
        return false
      }

      this.issues = responses[0]*/
      //this.comments = comments
    },
    async getWord () {
      if (this.word === '') {
        return false
      }
      const response = await WordService.getWord({
        word: this.word
      })

      let responses = response.data.results

      if (responses.length === 0) {
        this.wordMeaning = 'Your word could not be found and was not added.'
        this.wordData = ''
        return false
      }

      this.wordData = responses[0]
      this.wordMeaning = responses[0].senses[0].definition
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home{
  display: flex;
  align-items:center;
  justify-content: center;
  height: 100%;

  .input-container{
      width:100%;

      .input-group{
        display:flex;
        justify-content: space-between;

        input {
          box-sizing: border-box;
          width: calc(100% - 150px);
          padding: .5rem;
          border: 2px solid royalblue;
          font-size: 1rem;
          border-radius: 0;
          -webkit-appearance: none;
        }

        button{
          width:150px;
          height:50px;
          -webkit-appearance: none;
          background: royalblue;
          color: white;
          text-transform: uppercase;
          border: none;
          font-weight:bold;
          font-size: 12pt;
        }
      }
  }

  .word-meaning {
    margin: 20px 0;
    font-size: 18px;
    font-weight: bold;

    .word-links{
      margin: 30px 0 20px 0;
      font-size: 14px;
      font-weight: regular;

      a {
        border: 1px solid royalblue;
        text-decoration: none;
        padding: 5px 12px 3px 12px;
        margin: 0 10px;
        text-transform: uppercase;

        &:focus {
          color: royalblue;
        }
      }
    }
  }
}
</style>
