
import Card from 'react-bootstrap/Card';
import getRandomColor from './RandomColor';
import getRandomBlueColor from './RandomColor';

function BasicExample({proj}) {
  const randomBackgroundColor=getRandomColor();
  return (
    <Card style={{ width: '13rem', height:'fit-content',  backgroundColor: randomBackgroundColor, }}>
      <Card.Body>
        <Card.Title>{proj?.name}</Card.Title>
        <Card.Text >
        {proj?.description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default BasicExample;