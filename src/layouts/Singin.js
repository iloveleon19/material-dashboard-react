import React, { useState } from "react";
import { connect } from 'react-redux'

import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import { fetchUser } from '../actions/userActions.js'

const useStyles = makeStyles(styles);

const Singin = ({ fetchUser }) => {
  const classes = useStyles();
  const mainPanel = React.createRef();

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setInputs(state => ({ ...state, [name]: value }))
  };

  const handleClickSingin = (e) => {
    e.preventDefault();
    fetchUser(inputs)
  }

  return (
    <div className={classes.mainPanel} ref={mainPanel}>
      <div className={classes.content}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={10} sm={10} md={10}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Singin</h4>
                </CardHeader>

                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        inputProps={{
                          name: "email",
                          onChange: handleInputChange,
                          value: inputs.email,
                        }}
                        labelText="Email address"
                        id="email"
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        inputProps={{
                          type: 'password',
                          name: "password",
                          onChange: handleInputChange,
                          value: inputs.password,
                        }}
                        labelText="Password"
                        id="password"
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>

                <CardFooter>
                  <Button
                    color="primary"
                    onClick={handleClickSingin}
                  >
                    Singin
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>

    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (userInfo) => dispatch(fetchUser(userInfo))
  }
}

export default connect(null, mapDispatchToProps)(Singin);
