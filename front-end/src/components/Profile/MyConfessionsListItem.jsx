import { React } from "react";

import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ProfileCommentsList from "./ProfileCommentsList";
import useConfessionItem from "../../hooks/useConfessionItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from '@fortawesome/free-solid-svg-icons'
import './MyConfessionsListItem.scss';


export default function MyConfessionsListItem(props) {


  console.log("props:", props)
  const {
    categoryParser,
    badgeClass,
  } = useConfessionItem(props);


  return (

    <article className="confession_profile">
      <header className="confession__detail-top">
        <Badge className={badgeClass}>{categoryParser(props.categoryId)}</Badge>

        <p className="confession__title">{props.title}</p>
        <p className="confession__created_at"> {props.createdAt}</p>
        
      </header>

      <div className="confession__content">
        <p>{props.content}</p>
      </div>
      <footer className="confession__detail-bottom">
        <span className="confession__likes">
          <FontAwesomeIcon className="like-icon-liked" size="lg" icon={faStar} /> {props.likes}
        </span>
      <div>

        {props.selected && <Button className="comment-btn" variant="primary" size="sm" onClick={() => props.setSelected(null)} >Hide Comments</Button>}
        {!props.selected && <Button className="comment-btn" variant="primary" size="sm" onClick={() => props.setSelected(props.id)}>View Comments {`(${props.comments.length})`} </Button>}
      </div>
    </footer>
      {
    props.selected &&
    <ProfileCommentsList
      setConfessions={props.setConfessions}
      confessionState={props.confessionState}
      confessionId={props.id}
      comments={props.comments}
      confessionsToUpdate={props.confessionsToUpdate}
      myOwnConfessions={props.myOwnConfessions}
      setMyOwnConfessions={props.setMyOwnConfessions}
    />
  }
    </article >
  );
}

