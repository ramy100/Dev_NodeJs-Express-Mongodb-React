import React from "react";
import {
  Container,
  Header,
  Button,
  Icon,
  Segment,
  Grid,
  Image,
  Divider,
} from "semantic-ui-react";
import { useSelector } from "react-redux";
import { authuserSelector } from "../../store/slices/auth";
import { Link } from "react-router-dom";
import mysvg from "../../img/undraw_Freelancer_re_irh4.svg";
import background from "../../img/back3.png";
const Landing = ({ mobile }) => {
  const user = useSelector(authuserSelector);
  return (
    <>
      <Segment
        inverted
        textAlign="center"
        style={{ minHeight: mobile ? 400 : 700, padding: "1em 0em" }}
        vertical
      >
        <Container text>
          <Header
            as="h1"
            content="Developer Connector"
            inverted
            style={{
              fontSize: mobile ? "2em" : "4em",
              fontWeight: "normal",
              marginBottom: 0,
              marginTop: mobile ? "1.5em" : "3em",
            }}
          />
          <Header
            as="h2"
            content="Create a developer profile/portfolio, share posts and get help from other developers."
            inverted
            style={{
              fontSize: mobile ? "1.5em" : "1.7em",
              fontWeight: "normal",
              marginTop: mobile ? "0.5em" : "1.5em",
            }}
          />
          {!user ? (
            <Button primary as={Link} to="register" size="huge">
              Get Started
              <Icon name="right arrow" />
            </Button>
          ) : (
            <Button primary as={Link} to="dashboard" size="huge">
              DashBoard
              <Icon name="right arrow" />
            </Button>
          )}
        </Container>
      </Segment>
      <Segment
        style={{ padding: "8em 0em", backgroundColor: "white" }}
        vertical
      >
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                We Help Job Seekers
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                We can connect you to the company you are looking forward to
                work with . Let us boost your career.
              </p>
              <Header as="h3" style={{ fontSize: "2em" }}>
                We can connect you with outhers in same field
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                You can post here about your thoughts and get help from others !
              </p>
            </Grid.Column>
            <Grid.Column floated="right" width={6}>
              <Image bordered rounded size="large" src={mysvg} />
            </Grid.Column>
          </Grid.Row>
          {/* <Grid.Row>
            <Grid.Column textAlign="center">
              <Button size="huge">Check Them Out</Button>
            </Grid.Column>
          </Grid.Row> */}
        </Grid>
      </Segment>

      {/* <Segment style={{ padding: "0em" }} vertical>
        <Grid celled="internally" columns="equal" stackable>
          <Grid.Row textAlign="center">
            <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                "Why Us ?"
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                That is what they all say about us
              </p>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                "It helped me getting my dream job."
              </Header>
              <p style={{ fontSize: "1.33em" }}>Ahmed saad</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment style={{ padding: "8em 0em" }} vertical>
        <Container text>
          <Header as="h3" style={{ fontSize: "2em" }}>
            Breaking The Grid, Grabs Your Attention
          </Header>
          <p style={{ fontSize: "1.33em" }}>
            Instead of focusing on content creation and hard work, we have
            learned how to master the art of doing nothing by providing massive
            amounts of whitespace and generic content that can seem massive,
            monolithic and worth your attention.
          </p>
          <Button as="a" size="large">
            Read More
          </Button>

          <Divider
            as="h4"
            className="header"
            horizontal
            style={{ margin: "3em 0em", textTransform: "uppercase" }}
          >
            <a href="!#">Case Studies</a>
          </Divider>

          <Header as="h3" style={{ fontSize: "2em" }}>
            Did We Tell You About Our Bananas?
          </Header>
          <p style={{ fontSize: "1.33em" }}>
            Yes I know you probably disregarded the earlier boasts as
            non-sequitur filler content, but it's really true. It took years of
            gene splicing and combinatory DNA research, but our bananas can
            really dance.
          </p>
          <Button as="a" size="large">
            I'm Still Quite Interested
          </Button>
        </Container>
      </Segment> */}
    </>
  );
};

export default Landing;
