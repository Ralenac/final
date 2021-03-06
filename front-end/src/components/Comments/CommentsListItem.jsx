// import { useContext } from 'react'
// import { UserContext } from '../contexts/UserContext'
import './CommentsList.scss'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import "./CommentsListItem.scss"

dayjs.extend(relativeTime)

export default function CommentsListItem(props) {

  return (
    <article className="comment-container">
      <div className="comments--right">
      <p className="created_at" >{dayjs(props.createdAt).fromNow()}</p>
      </div>
      <div className="comments__content">
        <p>{props.content}</p>
      </div>
    </article>
  )
};