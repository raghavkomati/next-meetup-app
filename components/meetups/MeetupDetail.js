import { Fragment } from "react";
import classes from './MeetupDetail.module.css';

function MeetupDetail(props) {
    return (
        <section className={classes.detail}>
            <Fragment>
                <img src={props.image} alt={props.title}></img>
                <h1>{props.title}</h1>
                <address>{props.address}</address>
                <p>{props.description}</p>
            </Fragment>
        </section>
    );
};

export default MeetupDetail;