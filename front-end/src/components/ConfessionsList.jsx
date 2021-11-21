import { React, useState, useEffect } from "react";
import ConfessionListItem from "./ConfessionsListItem";
import axios from "axios";
import "./ConfessionsList.scss"



export default function ConfessionList(props) {

  // const [confessions, setConfessions] = useState([])

  // useEffect(() => {
  //   Promise.all([
  //     axios.get("/api/confessions")
  //   ]).then((res) => {
  //     setConfessions(prev => ([...prev, res[0].data]))
  //   })
  // }, []);

  // console.log(confession)

  const dateParser = (date) => {
    const parsedDate = date.split("").slice(0, 10).join("")
    return parsedDate
  }

  const parsedConfessions = props.confessionsToParse.map((confession) => (
    <ConfessionListItem
      key={confession.id}
      id={confession.id}
      userId={confession.user_id}
      categoryId={confession.category_id}
      content={confession.content}
      createdAt={dateParser(confession.created_at)}
      likes={confession.likes}
    />
  ));



  return (
    <section className="confessions">
      <ul className="confessions__list" >{parsedConfessions}</ul>
    </section>
  )
}