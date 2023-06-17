import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'gatsby';

import { Map, TileLayer, Marker, ZoomControl, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'mapbox-gl-leaflet';

import SEO from '../components/seo';
import Layout from '../components/layout';
import Header from '../components/header';
import ContactForm from '../components/contact-form';

import '../styles/static-pages.scss';
import 'leaflet/dist/leaflet.css';

const Contact = props => {
    const [showForm, setShowForm] = useState(false);
    const mapRef = useRef();
    let icon;
    if (typeof window !== 'undefined') {
        icon = L.icon({
            iconUrl: '/pin.svg',
            iconSize: [30, 30],
        });
    }

    useLayoutEffect(() => {
        if (typeof window !== 'undefined') {
            L.mapboxGL({
                accessToken: 'not-needed',
                style: 'https://api.maptiler.com/maps/27019e0a-55b2-4d82-bf1c-e5cdc720ca47/style.json?key=vKHO7WPorAq46LW6o8xs',
            }).addTo(mapRef.current.leafletElement);
            mapRef.current.leafletElement.invalidateSize();
        }
    }, []);

    return (
        <Layout {...props}>
            <SEO
                title={'Επικοινωνία'}
                description={'Επικοινωνήστε με τον Δίεση 101,3FM!'}
                url={`${process.env.GATSBY_SITE_URL}/contact`}
            />
            <Header label={'Επικοινωνία'} slug={'contact'} />
            <div className="Static-Pages">
                <div className="map">
                    {typeof window !== 'undefined' && (
                        <Map
                            zoomControl={false}
                            ref={mapRef}
                            center={[38.0796678, 23.785846]}
                            zoom={14}
                            scrollWheelZoom={false}
                        >
                            <ZoomControl position="bottomright" />
                            <TileLayer
                                attribution={`<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a>
										<a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>`}
                                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                            />
                            <Marker icon={icon} position={[38.079068, 23.787549]}>
                                <Popup offset={[0, -10]} className="map-popup">
                                    <span>Διεση 101.3 FM</span>
                                    <span>
                                        Βιλτανιώτη 36,
                                        <br />
                                        Κάτω Κηφισιά 14564
                                    </span>
                                </Popup>
                            </Marker>
                        </Map>
                    )}
                </div>
                <div className="content">
                    <div className="section">
                        <div className="title">Γραμματεία</div>
                        <div className="details">
                            <span style={{ marginRight: 65 }}>Βιλτανιώτη 36, Κάτω Κηφισιά 14564</span>
                            <a style={{ marginRight: 35 }} aria-label="Τηλέφωνο" href="tel:2111891013">
                                211 189 1013
                            </a>
                            <a aria-label="Email" href="mailto:diesi@diesi.gr">
                                diesi@diesi.gr
                            </a>
                        </div>
                    </div>
                    <div className="section">
                        <div className="title">Εμπορικό Τμήμα</div>
                        <div className="details">
                            <a aria-label="Τηλέφωνο εμπορικόυ τμήματος" href="tel:2111892310">
                                211892310
                            </a>
                        </div>
                    </div>
                    <div className="section">
                        <div className="title">Ραδιοφωνικοί Παραγωγοί</div>
                        <div className="details">
                            <span className="people">
                                <span>Θεόφιλος Δουμάνης</span>
                                <a aria-label="Email" href="mailto:theofilosd@yahoo.com">
                                    theofilosd@yahoo.com
                                </a>
                            </span>
                            <span className="people">
                                <span>Δήμητρα Τριανταφυλλίδου</span>
                                <a aria-label="Email" href="mailto:dimitra.tr@hotmail.com">
                                    dimitra.tr@hotmail.com
                                </a>
                            </span>
                            <span className="people">
                                <span>Έφη Γαλώνη</span>
                                <a aria-label="Email" href="mailto:galoni@diesi.gr">
                                    galoni@diesi.gr
                                </a>
                            </span>
                            <span className="people">
                                <span>Ανδρέας Κυριακάκης</span>
                                <a aria-label="Email" href="mailto:andreas@diesi.gr">
                                    andreas@diesi.gr
                                </a>
                            </span>
                            <span className="people">
                                <span>Παναγιώτης Μιχαλαρίας</span>
                                <a aria-label="Email" href="mailto:panosmich@gmail.com">
                                    panosmich@gmail.com
                                </a>
                            </span>
                            <span className="people">
                                <span>Νίκη Κροτσέτη</span>
                                <a aria-label="Email" href="mailto:niki@diesi.gr">
                                    niki@diesi.gr
                                </a>
                            </span>
                        </div>
                    </div>
                    <div className="section">
                        <div className="title">Δημοσιογράφοι</div>
                        <div className="details">
                            <span className="people">
                                <span>Κατερίνα Παναγιωτοπούλου</span>
                                <a aria-label="Email" href="mailto:katerinap@diesi.gr">
                                    katerinap@diesi.gr
                                </a>
                            </span>
                            <span className="people">
                                <span>Μαρία Κοσμοπούλου</span>
                                <a aria-label="Email" href="mailto:maria@diesi.gr">
                                    maria@diesi.gr
                                </a>
                            </span>
                        </div>
                    </div>
                    <div className="section">
                        <div className="title">Διευθυντής Προγράμματος</div>
                        <div className="details">
                            <span className="people">
                                <span>Γιώργος Γιαννόπουλος</span>
                                <a aria-label="Email" href="mailto:gg@diesi.gr">
                                    gg@diesi.gr
                                </a>
                            </span>
                        </div>
                    </div>
                    <div className="section">
                        <div className="title">Φόρμα Επικοινωνίας</div>
                        <div className="details">
                            <div className="full-width">
                                <div className="wrapper">
                                    <span>
                                        Επικοινωνήστε μαζί μας, αποστέλλοντας το μήνυμα σας μέσω της φόρμας επικοινωνίας
                                    </span>
                                    <span
                                        aria-label="Επικοινωνία"
                                        onClick={() => setShowForm(!showForm)}
                                        className="Button"
                                    >
                                        {showForm ? 'ΚΛΕΙΣΙΜΟ ΦΟΡΜΑΣ' : 'ΣΥΜΠΛΗΡΩΣΗ ΦΟΡΜΑΣ'}
                                    </span>
                                </div>
                            </div>
                            <ContactForm className={showForm ? 'show' : null} />
                        </div>
                    </div>
                    <div className="section">
                        <div className="title">Θέσεις Εργασίας</div>
                        <div className="details">
                            <div className="full-width">
                                <div className="wrapper">
                                    <span>
                                        Στείλτε πλήρες βιογραφικό, κατά προτίμηση με πρόσφατη φωτογραφία, αναγράφοντας
                                        τον τομέα ή την ειδικότητα, για την οποία ενδιαφέρεστε να εργαστείτε
                                    </span>
                                    <a
                                        aria-label="Αποστολή Βιογραφικού"
                                        href="https://www.konkat-citd.gr/Databases/gpl/cv/cv.nsf/CV.xsp?c=5196"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="Button"
                                    >
                                        ΑΠΟΣΤΟΛΗ ΒΙΟΓΡΑΦΙΚΟΥ
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section">
                        <div className="title">Όροι Διαγωνισμών</div>
                        <div className="details">
                            Για να δείτε τους όρους των διαγωνισμών, πατήστε
                            <Link style={{ color: '#0293de' }} to="/oroi-diagwnismwn">
                                εδώ
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Contact;
