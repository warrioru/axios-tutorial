import Api from '@/services/Api'

export default {
  getIssues(params) {
    return Api().get('/repos/' + params.owner + '/' + params.repo + '/issues')
  },
  getCommentsForIssue(params) {
    return Api().get('/repos/' + params.owner + '/' + params.repo + '/issues/' +
    params.number + '/comments')
  },
  getWord (params) {
    return Api().get('/wordwise/entries?limit=1&headword=' + params.word)
  },
  getWordDetails (params) {
    return Api().get('/entries/' + params)
  }
}
