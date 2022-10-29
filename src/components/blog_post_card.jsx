import React from "react";
import { Card, Nav } from "react-bootstrap";

export default function BlogPostCard({ id, title, author, content }) {

  const text = ''

  return (
    <Nav.Link href={`/${id}`}>
      <Card className="my-2 mx-auto">
        <Card.Body>
          <Card.Title className="border-bottom pb-3">{title}</Card.Title>
          <Card.Subtitle className="py-2 text-muted">Author</Card.Subtitle>
          <Card.Text dangerouslySetInnerHTML={{ __html:content.length < 255 ? content : content.slice(0, 255) + "..." }} />
        </Card.Body>
      </Card>
    </Nav.Link>
  );
}

const lorem =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, quo? Officiis ut tempore error, saepe magni ex nisi voluptas doloremque amet ducimus! Libero dolorum animi provident officiis, in sit cum odit, labore accusamus consectetur ullam ipsa? Labore odio, a sit iste saepe voluptate odit ratione.";
