import * as React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import useHasMounted from "../hooks/useHasMounted";
import CallToAction from "../components/CallToAction";
import bgPattern from "../images/bg-pattern-two-circles.svg";
import Seo from "../components/SEO";

const LocationContainer = styled.div`
  max-width: var(--site-container);
  display: flex;
  flex-direction: column;
  margin-bottom: 2.5rem;
  align-items: center;

  @media (min-width: 670px) {
    margin: 0 auto;
    padding: 1rem;
  }
  @media (min-width: 1200px) {
    flex-direction: row-reverse;
    justify-content: space-between;
    margin-bottom: 3rem;
    padding-left: 0;
    padding-right: 0;
    &:nth-of-type(2n) {
      flex-direction: row;
    }
  }
`;
const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url(${bgPattern}), #fdf3f0;
  background-repeat: no-repeat;
  background-position: bottom left;
  min-height: 300px;
  padding: 8rem 1rem;
  width: 100%;

  h2 {
    margin: 0;
    color: var(--peach);
  }

  @media (min-width: 670px) {
    /* flex-basis: 65%; */
    padding-left: 4rem;
    border-radius: 15px;
    max-width: 680px;
    align-items: flex-start;
    padding: 4.75rem;
    margin-bottom: 5.5rem;
  }
  @media (min-width: 1200px) {
    align-self: flex-start;
    flex-basis: 65%;
    border-radius: 15px;
    min-height: 300px;
    margin-bottom: 0;
  }
`;

const ContactRow = styled.div`
  margin-top: 1.5rem;

  text-align: center;

  span {
    display: block;
  }

  .title {
    font-weight: var(--font-weight-medium);
  }
  @media (min-width: 670px) {
    text-align: left;
  }

  @media (min-width: 1200px) {
    align-self: flex-end;
    padding-right: 4rem;
  }
`;

const ContactWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 670px) {
    flex-direction: row;
    justify-content: space-between;
    width: 80%;
  }
  @media (min-width: 1200px) {
    width: 100%;
  }
`;

const Map = styled(MapContainer)`
  height: 300px;
  width: 100%;

  @media (min-width: 670px) {
    height: 300px;
    max-width: 680px;
    border-radius: 15px;
    margin-bottom: 1.5rem;
  }

  @media (min-width: 1200px) {
    height: 300px;
    width: 380px;
  }
`;

const LocationsPage = ({ data }) => {
  return (
    <>
      <Seo title="Locations" />
      <main>
        {data.locations.nodes.map((location) => (
          <LocationContainer key={location.id} id={location.country}>
            {useHasMounted && (
              <Map
                center={[
                  `${location.coordinates.lat}`,
                  `${location.coordinates.lng}`,
                ]}
                zoom={16}
              >
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={[
                    `${location.coordinates.lat}`,
                    `${location.coordinates.lng}`,
                  ]}
                >
                  <Popup>
                    <strong>{location.office_name}</strong> <br />
                    {location.address_line1} <br />
                    {location.address_line2}
                  </Popup>
                </Marker>
              </Map>
            )}
            <ContactDetails>
              <h2>{location.country}</h2>
              <ContactWrapper>
                <ContactRow>
                  <span className="title">{location.office_name}</span>
                  <span>{location.address_line1}</span>
                  <span>{location.address_line2}</span>
                </ContactRow>
                <ContactRow>
                  <span className="title">Contact</span>
                  <span>P: {location.phone}</span>
                  <span>M: {location.email}</span>
                </ContactRow>
              </ContactWrapper>
            </ContactDetails>
          </LocationContainer>
        ))}
        <CallToAction />
      </main>
    </>
  );
};

export const query = graphql`
  query {
    locations: allSanityLocation {
      nodes {
        slug {
          current
        }
        phone
        office_name
        map_image_landscape {
          asset {
            url
          }
        }
        map_image {
          asset {
            url
          }
        }
        id
        email
        country
        address_line2
        address_line1
        coordinates {
          alt
          lat
          lng
        }
      }
    }
  }
`;

export default LocationsPage;
