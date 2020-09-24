import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Row,
  Form,
  Container,
  Col,
  Label,
  FormGroup,
  Button,
} from "reactstrap";
import { connect } from "react-redux";
import ReactTable from "react-table";
import compose from "compose-function";
import { translate } from "react-multi-lang";
import { Field, reduxForm, reset } from "redux-form";
import bgImage from "../../../assets/img/plain-white.jpg";
import { getStations } from "../../../actions/stationAction";
import { getCategories } from "../../../actions/categoryAction";
import { getSubCategoriesByCategory } from "../../../actions/subCategoryAction";
import SubmitBtnLoader from "../CommonComponents/SubmitBtnLoader";
import { createQueryString } from "../../../utils";
import {
  getLangBasedItems,
  getLangBasedStations,
  dateTimeFormat,
  getLangBasedDataLabel,
  showError,
} from "../../../helpers";
import { getClaims } from "../../../actions/claimAction";
import Datetime from "react-datetime";
import moment from "moment";
import _ from "lodash";
import { Table } from "reactstrap";
import LoaderComponent from "../CommonComponents/Loader";
import "moment/locale/fr"; // without this line it won't work
moment.locale("fr");

class ResearchClaim extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      mainLoader: true,
      hideOnError: false,
      startDate: "",
      endDate: "",
    };
    this.translations = {
      previousText: this.props.t("ReactTable.PREVIOUS"),
      pageText: this.props.t("ReactTable.PAGE"),
      rowsText: this.props.t("ReactTable.ROWS"),
      nextText: this.props.t("ReactTable.NEXT"),
      ofText: this.props.t("ReactTable.OF"),
      loadingText: "LOADING...",
      noDataText: this.props.t("ReactTable.NO_RECORD_FOUND"),
    };
  }

  componentDidMount() {
    this.props.dispatch(getStations());
    this.props.dispatch(getCategories());
    window.scrollTo(0, 0);
    // this.props.dispatch(getClaims());
  }
  componentWillReceiveProps = (nextProps) => {
    if (
      nextProps.categoryData &&
      nextProps.categoryData !== this.props.categoryData
    ) {
      // console.log(nextProps.categoryData);
      this.setState({
        categoryData: nextProps.categoryData,
      });
    }
    if (
      nextProps.subCategoryDataByCategory &&
      nextProps.subCategoryDataByCategory !==
      this.props.subCategoryDataByCategory
    ) {
      this.setState({
        subCategoryDataByCategory: nextProps.subCategoryDataByCategory,
      });
    }
    if (
      nextProps.stationData &&
      nextProps.stationData !== this.props.stationData
    ) {
      this.setState({
        stationData: nextProps.stationData,
        mainLoader: false,
      });
    }
    // if (
    //   nextProps.getClaimsData &&
    //   nextProps.getClaimsData !== this.props.getClaimsData
    // ) {
    //   console.log(nextProps.getClaimsData);
     
    //   this.setState({ mainLoader: false });
    //   let categories = [];
    //   if (nextProps.getClaimsData && nextProps.getClaimsData.length)
    //     nextProps.getClaimsData.map((category, key) => {
    //       categories.push({
     
    //         refNumber: category.referenceNo 
    //         trainNum:category.eventLocation === "Gare") || (category.eventLocation === "Other")) ? "Aucune" : category.trainNumber,
    //         createDate: category ? dateTimeFormat(category.createDate) : "",
    //         category: category ? getLangBasedDataLabel(category.category) : "",
    //        
    //         actions: {
    //           key: key,
    //         },
    //       });
    //     });
    //   this.setState({ categories });
    // }
    if (
      nextProps.getClaimsData &&
      nextProps.getClaimsData !== this.props.getClaimsData
    ) {

      this.setState({
        getClaimsData: nextProps.getClaimsData,
        loading: false,
        hideOnError: true,
      });
    }
    if (
      nextProps.noClaimError &&
      nextProps.noClaimError !== this.props.noClaimError
    ) {
      showError(this.props.t("ErrorMsg.NO_CLAIMS"));
      this.setState({ loading: false, hideOnError: false });
    }
    if (nextProps.isNoSubCategory && nextProps.isNoSubCategory !== this.props.isNoSubCategory) {
      // console.log(nextProps.isNoSubCategory)
      this.setState({ subCategoryDataByCategory: null })
    }
  };
  startDate = (event) => {
    this.setState({
      startDate: event.format("YYYY-MM-DD"),
      startDateSelectedValue: event,
    });
  };
  endDate = (event) => {
    this.setState({
      endDate: event.format("YYYY-MM-DD"),
      endDateSelectedValue: event,
    });
  };

  resetForm = () => {
    this.setState({
      endDate: "",
      startDate: "",
      hideOnError: false,
      subCategoryDataByCategory: null
    });
    this.props.dispatch(reset("ResearchClaim"));
  };

  showOptions = (data) => {
    // console.log(data);
    if (data && data.length) {
      return data.map((categories, key) => {
        return (
          <option value={categories.value} key={key}>
            {categories.label}
          </option>
        );
      });
    }
  };
  // get sub category by categoryID
  getSubCategoriesByCategory = (e) => {
    if (e.target.value !== "0") {
      const category = _.find(this.state.categoryData.categoryClients, {
        code: e.target.value,
      });

      this.props.dispatch(getSubCategoriesByCategory(e.target.value));
    } else {
      this.setState({
        getSubCategoriesByCategory: [],
      });
    }
  };
  onSubmit = (formProps) => {
    console.log(formProps);
    if (this.state.startDate) {
      formProps.startDate = this.state.startDate;
    }
    if (this.state.endDate) {
      formProps.endDate = this.state.endDate;
    }
    createQueryString(formProps);
    let searchs = [];
    if (formProps.claimStatus) {
      searchs.push({
        searchField: "claimStatus",
        value: formProps.claimStatus,
      })
    }
    if (formProps.startDate) {
      searchs.push({
        searchField: "startDate",
        value: moment(formProps.startDate).format('YYYY-MM-DD'),
      })
    }
    if (formProps.endDate) {
      searchs.push({
        searchField: "endDate",
        value: moment(formProps.endDate).format('YYYY-MM-DD')
      })
    }
    if (formProps.subCategoryCode) {
      searchs.push({
        searchField: "subCategoryCode",
        value: formProps.subCategoryCode,
      })
    }
    if (formProps.categoryCode) {
      searchs.push({
        searchField: "categoryCode",
        value: formProps.categoryCode,
      })
    }
    if (formProps.eventStationCode) {
      searchs.push({
        searchField: "eventStationCode",
        value: formProps.eventStationCode,
      })
    }
    this.props.dispatch(getClaims({ searchs }));
    this.setState({ loading: true });
  };


  viweClaim = (e) => {
    this.props.history.push(`/pages/view-claim-details?code=${e}`);
  };
  // updateClaim = (e) => {
  //   this.props.history.push(`/pages/update-claim?code=${e}`);
  // };

  showClaimsTable = (claimsData) => {
    return claimsData.map((data, key) => {
      return (
        <tr>
          <th>{data ? data.referenceNo : ""}</th>
          <th>{((data && data.eventLocation === "Gare") || (data && data.eventLocation === "Other")) ? "Aucune" : data.trainNumber}</th>
          <th>{data ? dateTimeFormat(data.createDate) : ""}</th>
          <th>{data ? getLangBasedDataLabel(data.category) : ""}</th>

          <th>
            <center>
              {data && data.claimStatus === "1" && (
                <label className="btn btn-primary text-light">
                  <span>{this.props.t("Claim.SUBMITTED")}</span>
                </label>
              )}
              {/*  */}
              {data && data.claimStatus === "2" && (
                <label className="btn btn-warning text-light">
                  <span>{this.props.t("Claim.IN_PROGRESS")}</span>
                </label>
              )}
              {/*  */}
              {data && data.claimStatus === "3" && (
                <label className="btn btn-success text-light">
                  <span>{this.props.t("Claim.APPROVED")}</span>
                </label>
              )}
              {/*  */}
              {data && data.claimStatus === "4" && (
                <label className="btn btn-danger text-light">
                  <span> {this.props.t("Claim.REJECTED")}</span>
                </label>
              )}
              {/*  */}
              {data && data.claimStatus === "5" && (
                <label className="btn btn-secondary text-light">
                  <span> {this.props.t("Claim.TEMP_APPROVED")}</span>
                </label>
              )}
            </center>
          </th>
          <td class=" btns-mr-5">
            <div>
              <label
                className="enablePointer"
                // title={this.props.t("Claim.VIEW_CLAIM")}
                onClick={(e) => this.viweClaim(data.code)}
              >
                <i class="text-dark fa fa-eye"></i>&nbsp;{" "}
                {this.props.t("Claim.VIEW")}
              </label>
            </div>
            <div>
              {data && data.claimStatus !== "5" && data.claimStatus !== "3" && data.claimStatus!== "2" && (
                <Link className="text-decoration-none" target="_blank" to={`/pages/update-claim?code=${data.code}`}>
                  <label
                    className="enablePointer"
                  >
                    <i class="fa fa-edit text-dark"></i> &nbsp;{" "}
                    {this.props.t("Claim.MODIFY")}
                  </label>
                </Link>
              )}
            </div>
          </td>
        </tr>
      );
    });
  };
  render() {
    const { handleSubmit } = this.props;
    const header = {
      RefNumber: this.props.t("Claim.REF_N"),
      trainNum: this.props.t("Claim.TRAIN_NUM"),
      createDate: this.props.t("Claim.CREATE_DATE"),
      category: this.props.t("Claim.CATEGORY"),
      status:this.props.t("Claim.STATUS"),
      actions:this.props.t("Claim.ACTION")
    };
    return (
      <div>
        {" "}
        <LoaderComponent loading={this.state.mainLoader} />
        <div className="full-page-content">
          <div className="login-page">
            <Container>
              <Form
                noValidate
                className="form-horizontal"
                onSubmit={handleSubmit(this.onSubmit)}
              >
                <div className="card-header-c">
                  <span>{this.props.t("Claim.SEARCH")}</span>
                </div>
                <Card className="p-3" id="ic-card">
                  <CardBody>
                    <Row>
                      <Col md={4} lg={4}>
                        <FormGroup>
                          <Label for="exampleEmail">
                            {this.props.t("Claim.STATUS")}
                          </Label>
                          <Field
                            type="select"
                            name="claimStatus"
                            component="select"
                            className="form-control"
                          >
                            <option value="">
                              {this.props.t("Claim.SELECT_STATUS")}
                            </option>
                            <option value="1">
                              {this.props.t("Claim.SUBMITTED")}
                            </option>
                            <option value="2">
                              {this.props.t("Claim.IN_PROGRESS")}
                            </option>
                            <option value="3">
                              {this.props.t("Claim.APPROVED")}
                            </option>
                            {/*<option value="4">*/}
                            {/*  {this.props.t("Claim.REJECTED")}*/}
                            {/*</option>*/}
                            <option value="5">
                              {this.props.t("Claim.TEMP_APPROVED")}
                            </option>
                          </Field>
                        </FormGroup>
                      </Col>
                      <Col md={4} lg={4}>
                        <FormGroup>
                          <Label for="exampleDatetime">
                            {this.props.t("Claim.START_DATE")}
                          </Label>
                          <Datetime
                            closeOnSelect
                            id="stateDate"
                            // locale="fr"
                            value={this.state.startDate}
                            timeFormat={false}
                            inputProps={{
                              readOnly: true,
                              placeholder: this.props.t("Claim.SELECT_DATE"),
                            }}
                            onChange={(e) => this.startDate(e)}
                            dateFormat
                          />
                        </FormGroup>
                      </Col>
                      <Col md={4} lg={4}>
                        <FormGroup>
                          <Label for="exampleSelect">
                            {this.props.t("Claim.END_DATE")}
                          </Label>
                          <Datetime
                            closeOnSelect
                            id="endDate"
                            value={this.state.endDate}
                            timeFormat={false}
                            dateFormat
                            inputProps={{
                              readOnly: true,
                              placeholder: this.props.t("Claim.SELECT_DATE"),
                            }}

                            onChange={(e) => this.endDate(e)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={4} lg={4}>
                        <FormGroup>
                          <Label for="exampleSelect">
                            {this.props.t("Claim.CATEGORY")}
                          </Label>
                          <Field
                            name="categoryCode"
                            type="select"
                            component="select"
                            placeholder={""}
                            className="form-control"
                            onChange={(e) => this.getSubCategoriesByCategory(e)}
                          // validate={[required]}
                          >
                            <option value="">
                              {this.props.t("Claim.SELECT_CATEGORY")}
                            </option>
                            {this.showOptions(
                              this.state.categoryData
                                ? getLangBasedItems(
                                  this.state.categoryData.categoryClients
                                )
                                : null
                            )}
                          </Field>
                        </FormGroup>
                      </Col>
                      <Col md={4} lg={4}>
                        <FormGroup>
                          <Label for="exampleSelect">
                            {this.props.t("Claim.SUB_CATEGORY")}
                          </Label>
                          <Field
                            name="subCategoryCode"
                            type="select"
                            component="select"
                            placeholder={""}
                            className="form-control"
                          // onChange={(e) => this.getDepatureStationId(e)}
                          // validate={[required]}
                          >
                            <option value="">
                              {this.props.t("Claim.SELECT_SUB_CATEGORY")}
                            </option>
                            {this.showOptions(
                              this.state.subCategoryDataByCategory
                                ? getLangBasedItems(
                                  this.state.subCategoryDataByCategory
                                    .subCategoryClients
                                )
                                : null
                            )}
                          </Field>
                        </FormGroup>
                      </Col>
                      <Col md={4} lg={4}>
                        <FormGroup>
                          <Label for="exampleDatetime">
                            {this.props.t("Claim.STATION")}
                          </Label>
                          <Field
                            type="select"
                            name="eventStationCode"
                            component="select"
                            required
                            // validate={[required]}
                            className="form-control"
                          >
                            <option value="">
                              {this.props.t("Claim.SELECT_STATION")}
                            </option>
                            {this.showOptions(
                              this.state.stationData
                                ? getLangBasedStations(
                                  this.state.stationData.listGare
                                )
                                : null
                            )}
                          </Field>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6} lg={6} className="mx-auto mt-5">
                        <SubmitBtnLoader
                          label={this.props.t("Claim.SEARCH")}
                          className="btn-primary btn-lg mx-3 btn-width border-rm"
                          loading={this.state.loading}
                          submitting={""}
                          type="submit"
                        />
                        <Button
                          color="primary"
                          size="lg"
                          className="border-rm mx-3 btn-width"
                          onClick={(e) => this.resetForm()}
                        >
                          {this.props.t("Claim.RESET")}
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Form>
              {this.state.getClaimsData && this.state.hideOnError && (
               
          //           <Row>
          //   <Col md="12">
          //     <Card className="main-card mb-3">
          //       <CardBody className="text-center">
          //         <ReactTable
          //           data={categories}
          //           columns={[
          //             {
          //               columns: [
          //                 {
          //                   Header: header.RefNumber,
          //                   accessor: "refNumber",
          //                 },
          //                 {
          //                   Header: header.trainNum,
          //                   accessor: "trainNum",
          //                 },
          //                 {
          //                   Header: header.createDate,
          //                   accessor: "createDate",
          //                 },
          //                 {
          //                   Header: header.category,
          //                   accessor: "category",
          //                 },
          //                 {
          //                   Header: header.status,
          //                   accessor: "status",
          //                 },
          //                 {
          //                   Header: header.actions,
          //                   accessor: "actions",
          //                   sortable: false,
          //                   filterable: false,
          //                   Cell: (row) => (
          //                     <div>
          //                       <div className="widget-content p-0">
          //                         <div className="widget-content-wrapper">
          //                           <div className="ml-4 d-inline">
          //                             {canManage(permissions.deletable) && (
          //                               <SubmitBtnLoader
          //                                 className="btn btn-primary"
          //                                 title={this.props.t("Common.DELETE")}
          //                                 onClick={(e) =>
          //                                   this.deleteChannel(
          //                                     row.index,
          //                                     row.original.actions.key
          //                                   )
          //                                 }
          //                                 label={
          //                                   <i className="fa fa-trash-alt"></i>
          //                                 }
          //                                 loading={
          //                                   row.original.actions.key ===
          //                                     this.state.rowKey &&
          //                                   this.state.loading
          //                                 }
          //                               />
          //                             )}
          //                           </div>
          //                         </div>
          //                       </div>
          //                     </div>
          //                   ),
          //                 },
          //               ],
          //             },
          //           ]}
          // defaultPageSize={10}
          // showPaginationTop
          // showPaginationBottom={false}
          // className="-striped -highlight"
          //           
                   
          //         
          //           {...this.translations}
          //         />
          //       </CardBody>
          //     </Card>
          //   </Col>
          // </Row>
          <Card>
                  <CardBody>
                    <Table striped>
                      <thead className="t-head-color">
                        <tr className="text-center">
                          <th>{this.props.t("Claim.REF_N")}</th>
                          <th>{this.props.t("Claim.TRAIN_NUM")}</th>{" "}
                          <th>{this.props.t("Claim.CREATE_DATE")}</th>
                          <th>{this.props.t("Claim.CATEGORY")}</th>
                          <th>{this.props.t("Claim.STATUS")}</th>
                          <th>{this.props.t("Claim.ACTION")}</th>
                          
                        </tr>
                      </thead>
                      <tbody className="t-body-color">
                        {this.state.getClaimsData &&
                          this.showClaimsTable(
                            this.state.getClaimsData.claimClients
                          )}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              )}
            </Container>
          </div>
        </div>
        <div
          className="full-page-background"
          style={{ backgroundImage: "url(" + bgImage + ")" }}
        />
      </div>
    );
  }
}

ResearchClaim = reduxForm({
  form: "ResearchClaim",
  //validate,
  // asyncValidate,
})(ResearchClaim);

const mapStateToProps = (state) => {
  console.log(state.claim.isNoSubCategory);
  return {
    categoryData: state.category.categoryData,
    subCategoryDataByCategory: state.subCategory.subCategoryDataByCategory,
    stationData: state.station.stationData,
    // getClaimsData: state.claim.getClaimsData
    // ? state.claim.getClaimsData.claimClients
    // : [],
    getClaimsData: state.claim.getClaimsData,
    noClaimError: state.claim.noClaimError,
    isNoSubCategory: state.subCategory.isNoSubCategory
  };
};

export default compose(translate, connect(mapStateToProps))(ResearchClaim);

// claimClients;
