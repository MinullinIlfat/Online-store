export type CommentsType = {
  allCount: 5,
  comments:[
    id: string,
    text: string,
    date: string,
    likesCount: number,
    dislikesCount: number,
    user: {
      id: string,
      name: string
    }
  ]
}
