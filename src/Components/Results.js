import React from 'react';
import { Card, Icon, Image, Button, Container, Segment, Divider, Grid, Table, Tab } from 'semantic-ui-react'
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'

class Results extends React.Component{

    clickHandler=()=>{
        console.log('click heard in Results', this.props)
        let data={
            etag: this.props.book.id, 
            link: this.props.book.accessInfo.webReaderLink,
            title: this.props.book.volumeInfo.title, 
            author: this.props.book.volumeInfo.authors[0],
            img: this.props.book.volumeInfo.imageLinks.thumbnail, 
            page: this.props.book.volumeInfo.pageCount,
            published: this.props.book.volumeInfo.publishedDate
        }
        console.log(data)
        this.props.makeBook(data)
    }
    render(){
        console.log('Results props', this.props)
        return (
            <Segment floated>
                <Grid columns={2}>
                    <Grid.Column>
                {this.props.book.volumeInfo.imageLinks.thumbnail ?  
                <Image src={this.props.book.volumeInfo.imageLinks.thumbnail} bordered size='small' href={this.props.book.accessInfo.webReaderLink} target='_blank'/> :
                <Image  src='http://getwallpapers.com/wallpaper/full/2/1/9/699354-cute-dog-backgrounds-2560x2048-htc.jpg'/>
            }

                    </Grid.Column>
            
                    <Grid.Column>
                <Table>
                    <Table.Body>

                        <Table.Row>
                            <Table.Cell>
                                <h4>Title</h4>
                            </Table.Cell>
                            <Table.Cell>
                                {this.props.book.volumeInfo.title}
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                <h4>Author</h4>
                            </Table.Cell>
                            <Table.Cell>
                            {this.props.book.volumeInfo.authors[0]}
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                <h4>Published</h4>
                            </Table.Cell>
                            <Table.Cell>
                            {this.props.book.volumeInfo.publishedDate}
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                <h4>Pages</h4>
                            </Table.Cell>
                            <Table.Cell>
                            {this.props.book.volumeInfo.pageCount}
                            </Table.Cell>
                        </Table.Row>

                    </Table.Body>
                    </Table>
                    <Button onClick={this.clickHandler}>Add to Library</Button>
                    </Grid.Column>
                </Grid>
                </Segment>
        )
    }
}

export default withRouter(Results)

