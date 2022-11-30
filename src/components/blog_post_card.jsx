import React from "react";
import { Card, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function BlogPostCard({ id, title, author, content, email }) {
  const text = "";

  return (
    <Card className="my-2 mx-auto">
      <Nav.Link as={Link} to={`/${id}`}>
        <Card.Body>
          <Card.Title className="border-bottom pb-3">{title}</Card.Title>
          <Card.Subtitle className="py-2 text-muted">{author}</Card.Subtitle>
          <Card.Text
            dangerouslySetInnerHTML={{
              __html:
                content.length < 255 ? content : content.slice(0, 255) + "...",
            }}
          />
        </Card.Body>
      </Nav.Link>
    </Card>
  );
}
