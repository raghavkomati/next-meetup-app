import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from 'mongodb';
import { Fragment } from "react";
import Head from "next/head";

function MeetupPage(props) {
    return (
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name="description" content={props.meetupData.description}></meta>
            </Head>
            <MeetupDetail
                title={props.meetupData.title}
                image={props.meetupData.image}
                address={props.meetupData.image}
                description={props.meetupData.description}
            />
        </Fragment>
    );
}

export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://max:reactguru@cluster0.rb7ry.mongodb.net/meetups?retryWrites=true&w=majority',  {useUnifiedTopology: true });
    const db = client.db();
    const collection = db.collection('meetups');
    const meetups = await collection.find({}, { _id: 1}).toArray();
    client.close();
    console.log(meetups);

    return {
        fallback: false,
        paths: meetups.map(meetup => ({
            params: {
                meetupId: meetup._id.toString()
            }
        }))
    }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;
    const client = await MongoClient.connect('mongodb+srv://max:reactguru@cluster0.rb7ry.mongodb.net/meetups?retryWrites=true&w=majority',  {useUnifiedTopology: true });
    const db = client.db();
    const collection = db.collection('meetups');
    const selectedMeetup = await collection.findOne({_id: ObjectId(meetupId)});
    client.close();

    console.log(meetupId, selectedMeetup);
    return {
        props: {
            meetupData: {
                title: selectedMeetup.title,
                id: selectedMeetup._id.toString(),
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description
            }
        }
    };
}

export default MeetupPage;