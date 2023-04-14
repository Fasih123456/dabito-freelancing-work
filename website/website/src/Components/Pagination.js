import Pagination from "react-bootstrap/Pagination";

function TweetPagination({ pageNumbers }) {
  let active = 2;
  let items = [];
  for (let number = 1; number <= pageNumbers; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

  const paginationBasic = (
    <div>
      <Pagination size="lg">{items}</Pagination>
      <br />
    </div>
  );

  return paginationBasic;
}

export default TweetPagination;
