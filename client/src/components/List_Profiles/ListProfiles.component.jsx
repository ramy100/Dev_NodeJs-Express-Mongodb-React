import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AllProfilesSelector,
  getAllProfilesCallBegin,
  ProfilesPagesCountSelector,
  ProfileCurrentPageSelector,
  changeProfileCurrentPage,
} from "../../store/slices/profile";
import ProfilesListItem from "./ProfilesListItem/ProfilesListItem.component";
import { useEffect } from "react";
import { Pagination, Grid, Item } from "semantic-ui-react";
import SectionComponent from "../Section/Section.component";
import ProfileListItemPlaceholder from "./ProfileListItemPlaceholder/ProfileListItemPlaceholder.component";
const ListProfiles = () => {
  const dispatch = useDispatch();
  const pages = Math.ceil(useSelector(ProfilesPagesCountSelector));
  const currentPage = useSelector(ProfileCurrentPageSelector);
  const AllProfiles = useSelector(AllProfilesSelector);
  const currentList = AllProfiles[currentPage];
  useEffect(() => {
    if (!currentList) {
      dispatch(getAllProfilesCallBegin(currentPage));
    }
  }, []);

  useEffect(() => {
    // if (!currentList) {
    dispatch(getAllProfilesCallBegin(currentPage));
    // }
  }, [currentPage]);

  const ProfilesElements = currentList ? (
    currentList.map((profile) => (
      <ProfilesListItem profile={profile} key={profile._id} />
    ))
  ) : (
    <Fragment>
      <ProfileListItemPlaceholder />
      <ProfileListItemPlaceholder />
      <ProfileListItemPlaceholder />
      <ProfileListItemPlaceholder />
      <ProfileListItemPlaceholder />
      <ProfileListItemPlaceholder />
      <ProfileListItemPlaceholder />
    </Fragment>
  );

  return (
    <div style={{ minHeight: "66vh" }}>
      <Fragment>
        <Grid centered>
          <Grid.Column width={13}>
            <SectionComponent iconName="users" title="Developers">
              <Item.Group divided>{ProfilesElements}</Item.Group>
            </SectionComponent>
          </Grid.Column>
        </Grid>
        <div style={{ textAlign: "center" }}>
          <Pagination
            defaultActivePage={currentPage + 1}
            totalPages={pages}
            onPageChange={(e, { activePage }) =>
              dispatch(changeProfileCurrentPage(activePage - 1))
            }
          />
        </div>
      </Fragment>
    </div>
  );
};

export default ListProfiles;
