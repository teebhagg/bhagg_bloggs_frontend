import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';

export default function CardSkeleton() {
  return (
      <Card className="mx-auto mb-3">
        <Card.Body>
          <Placeholder className="border-bottom pb-3 " as={Card.Title} animation="glow">
            <Placeholder className="rounded-1" size="md" xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder className="rounded-1" size="lg" xs={10} />
            <Placeholder className="rounded-1" size="sm" xs={8} />
            <Placeholder className="rounded-1" size="sm" xs={5} />
          </Placeholder>
        </Card.Body>
      </Card>
  );
}
