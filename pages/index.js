// import { useEffect, useState } from 'react';
import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import Head from 'next/head';
import { Fragment } from 'react';

const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'My first meetup',
        image: 'https://picsum.photos/seed/picsum/200/300',
        address: 'Some Plot, Some Street, 10, Some City - 50000',
        description: 'This is my first meetup!'
    },
    {
        id: 'm1',
        title: 'My first meetup',
        image: 'https://picsum.photos/seed/picsum/200/300',
        address: 'Some Plot, Some Street, 10, Some City - 50000',
        description: 'This is my first meetup!'
    }
]

function HomePage(props) {
    // const [ loadedMeetups, setLoadedMeetups ] = useState([]);

    // useEffect(() => {
    //     setLoadedMeetups(DUMMY_MEETUPS);
    // }, []);

    return (
        <Fragment>
            <Head>
                <title>React Meetups Page</title>
                <meta name="description" content="List of amazing meetups to attend!"></meta>
            </Head>
            <MeetupList meetups={props.meetups}></MeetupList>
        </Fragment>
    );
}

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;
//     console.log(req, res);
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS 
//         }
//     };
// }

export async function getStaticProps(context) {
    const client = await MongoClient.connect('mongodb+srv://max:reactguru@cluster0.rb7ry.mongodb.net/meetups?retryWrites=true&w=majority', { useUnifiedTopology: true } );
    const db = client.db();
    const collection = db.collection('meetups');
    const meetups = await collection.find().toArray();
    client.close();
    return {
        props: {
            meetups: meetups.map(meetup => (
                {
                    title: meetup.title,
                    address: meetup.address,
                    image: meetup.image,
                    description: meetup.description,
                    id: meetup._id.toString()
                })
            )
        },
        revalidate: 1
    };
}

export default HomePage;