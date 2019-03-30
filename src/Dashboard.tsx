import * as React from 'react';

import {
  Brand,
  Nav, NavItem, NavList,
  Page, PageHeader, PageSection, PageSidebar,
  Text, TextContent
} from '@patternfly/react-core';

import {
  Route,
//   Switch,
//   NavLink,
//   BrowserRouter
} from "react-router-dom";

import { HexmapCanvas } from "./components/HexmapCanvas";

import brandImage from './images/one_hex.png';

// interface IDashboardProps {
// };

interface IDashboardState {
  activeItem: number
};

export class Dashboard extends React.Component<{}, IDashboardState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      activeItem: 0
    };
  }
  
  public render() {

    const { activeItem } = this.state;
    
    // Define the components of the page
    const Header = (
      <PageHeader
        logo={<Brand src={brandImage} alt="Hexgame Logo" />}
      />
    )

    const PageNav = (
      <Nav onSelect={this.onNavSelect} aria-label="Nav">
        <NavList>
          <NavItem to="/maps/sample" itemId={0} isActive={activeItem === 0}>
            Sample Map
          </NavItem>
          <NavItem to="/maps/melee" itemId={1} isActive={activeItem === 1}>
            Melee
          </NavItem>
          <NavItem to="/maps/wizard" itemId={2} isActive={activeItem === 2}>
            Wizard
          </NavItem>
        </NavList>
      </Nav>
    )
    
    const Sidebar = (
        <PageSidebar nav={PageNav}/>
    )

    // Define the actual page layout
    return (
        <Page header={Header} sidebar={Sidebar} >
        <PageSection>
          <TextContent>
            <Text component="h1">Main Title</Text>
            <Text component="p">
              Body text should be Overpass Regular at 16px. It should have leading of 24px because <br />
              of it’s relative line height of 1.5.
            </Text>
          </TextContent>
        </PageSection>
        <PageSection>
        <Route path="/maps/:name" component={HexmapCanvas} />
        </PageSection>
        </Page>
    )
  }

  private onNavSelect = (groupId: number, itemId: number, event: React.FormEvent) => {
    this.setState({
      activeItem: itemId
    });
  };

};

export default Dashboard;