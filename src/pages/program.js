import React from 'react';
import { graphql } from 'gatsby';

import moment from 'moment';

import SEO from '../components/seo';
import Day from '../components/day';
import Layout from '../components/layout';
import Header from '../components/header';

import '../styles/category.scss';
import '../styles/program.scss';

const Program = props => {
    const dataPanagiotopoulou = props?.data?.allApiProgram?.nodes[0]?.monday?.filter(
        producer => producer.producer_id == 7
    )[0];
    const dataGiannopoulos = props?.data?.allApiProgram?.nodes[0].monday?.filter(
        producer => producer.producer_id == 8
    )[0];

    return (
        <Layout {...props}>
            <SEO title="Πρόγραμμα - ΔΙΕΣΗ 101.3" url={`${process.env.GATSBY_SITE_URL}/program`} />
            <Header label="Πρόγραμμα" slug="program" />
            <div className="Program">
                <div className="schedule-wrapper">
                    <div className="main-title">Δευτέρα - Παρασκευή</div>
                    {props.data.allApiProgram.nodes[0].monday.map((day, key) => (
                        <Day
                            key={key}
                            time={`${moment(day.start, 'HH:mm').format('HH:mm')} - ${moment(day.stop, 'HH:mm').format(
                                'HH:mm'
                            )}`}
                            avatar={day.image}
                            name={day.name}
                            producer={day.producer_id}
                            social={{
                                email: day?.email?.length ? day.email : null,
                                instagram: day?.instagram?.length ? day.instagram : null,
                                twitter: day?.twitter?.length ? day.twitter : null,
                                facebook: day?.facebook?.length ? day.facebook : null,
                            }}
                            desc={null}
                        />
                    ))}
                    <div style={{ marginTop: 50 }} className="main-title">
                        Δελτία Ειδήσεων
                    </div>
                    <Day
                        time="07:00 - 13:00"
                        avatar={dataPanagiotopoulou?.image}
                        name={dataPanagiotopoulou?.name ?? 'Κατερίνα Παναγιωτοπούλου'}
                        desc={null}
                    />
                    <Day time="14:00 - 19:00" avatar="636cda66308db.jpg" name="Μαρία Κοσμοπούλου" desc={null} />
                    <div style={{ marginTop: 50 }} className="main-title">
                        Μουσική Επιμέλεια
                    </div>
                    <Day
                        time="Σαββατοκύριακο"
                        avatar={dataGiannopoulos?.image}
                        producer="weekend"
                        name={dataGiannopoulos?.name ?? 'Γιώργος Γιαννόπουλος'}
                        desc={null}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default Program;

export const pageQuery = graphql`
    query Program {
        allApiProgram {
            nodes {
                monday {
                    alternative_id
                    day
                    isLive
                    name
                    producer_id
                    start
                    stop
                    facebook
                    twitter
                    email
                    instagram
                    image
                }
            }
        }
    }
`;
