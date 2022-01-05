import React, { Component } from 'react';
import { List, Icon, Avatar, Typography, Rate, Statistic, Select, Row, Col } from 'antd';

const { Paragraph, Text } = Typography;
const { Option } = Select;

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  componentWillMount() {
    const { reviews } = this.props.artist;
    this.setState({ data: reviews });
  }
  handleSelect(e) {
    const { reviews } = this.props.artist;
    if (e === 0) this.setState({ data: reviews });
    else this.setState({ data: reviews.filter(p => Math.floor(parseInt(p.review.rating)) === parseInt(e)) });
  }

  render() {
    const { rating } = this.props.artist;
    const { data } = this.state;
    return (
      <div className="reviews-container">
        <Row type="flex" align="middle" justify="space-between">
          <Col xs={10} md={7} lg={5}>
            <Statistic title="Overall Rating" value={rating} prefix={<Icon type="star" theme="filled" />} />
          </Col>
          <Col xs={14} md={10} lg={8} xl={7}>
            <Select size="small" defaultValue={0} onSelect={this.handleSelect} >
              <Option value={5}> 5 stars</Option>
              <Option value={4}> 4+ stars</Option>
              <Option value={3}> 3+ stars</Option>
              <Option value={2}> 2+ stars</Option>
              <Option value={1}> 1+ stars</Option>
              <Option value={0}> All</Option>
            </Select>
          </Col>
        </Row>
        <List
          dataSource={data}
          pagination={{
            position: 'bottom',
          }}
          renderItem={item => (
            <List.Item key={item.review._id}>
              <List.Item.Meta
                avatar={item.ownedBy.image ? <Avatar src={item.ownedBy.image.publicURL} /> : <Avatar> {item.ownedBy.firstName.charAt(0).toUpperCase()} </Avatar>}
                title={<Text strong>{`${item.ownedBy.firstName} ${item.ownedBy.lastName}`}</Text>}
                description={
                  <div className="content">
                    <Rate disabled allowhalf defaultValue={item.review.rating} />
                    <Paragraph ellipsis={{ rows: 4, expandable: true }}>
                      {item.review.review}
                    </Paragraph>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default Content;
