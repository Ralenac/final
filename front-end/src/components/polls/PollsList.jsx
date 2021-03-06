import { React } from "react";
import PollsListItem from "./PollsListItem";
import "./PollsList.scss";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime)


export default function PollsList(props) {

    


  const parsedPolls = props.polls.map((poll) => (
    <PollsListItem
      key={poll.id}
      id={poll.id}
      content={poll.content}
      createdAt={dayjs(poll.created_at).fromNow()}
      options={poll.options}
      totalVotes={props.totalVotes}
      setTotalVotes={props.totalVotes}
      setPolls={props.setPolls}
      polls={props.polls}

    />
  ));

 
  return (
    <div className="polls">
      <div>{parsedPolls}</div>
    </div>
   )
}


  