import React from "react";
import { Card, Button } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
const CardComponent = ({
  header,
  from,
  to,
  description,
  extra,
  onDelete,
  loading,
}) => {
  const dispatch = useDispatch();
  const DeleteFromProfile = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        dispatch(onDelete());
      }
    });
  };
  return (
    <Card>
      <Card.Content>
        <Button
          icon={{ name: "trash alternate outline", color: "red" }}
          circular
          floated="right"
          loading={loading}
          disabled={loading}
          onClick={DeleteFromProfile}
        ></Button>
        <Card.Header>{header}</Card.Header>
        <Card.Meta>{`
      ${new Date(from).getFullYear()} - ${
          to ? new Date(to).getFullYear() : "Untill Now"
        }`}</Card.Meta>
        <Card.Description>
          <p>{description}</p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <p>{extra}</p>
      </Card.Content>
    </Card>
  );
};

export default CardComponent;
