import * as React from 'react';

import {
  Brand,
  Nav, NavItem, NavList,
  Page, PageHeader, PageSection, PageSidebar,
  Text, TextContent
} from '@patternfly/react-core';

import {
  Route,
  RouteComponentProps
//   Switch,
//   NavLink,
//   BrowserRouter
} from "react-router-dom";

import { HexmapCanvas, Orientation } from "./components/HexmapCanvas";

import brandImage from './images/one_hex.png';

// interface IDashboardProps {
// };

interface IDashboardState {
  activeItem: number,
};

export class Dashboard extends React.Component<{}, IDashboardState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      activeItem: 0,
    };
  }

  public render() {

    const { activeItem } = this.state;
    
    // Define the components of the page
    const Header = (
      <PageHeader
        logo={<Brand src={brandImage} alt="Hexgame Logo" />}
        showNavToggle={true}
      />
    )

    const PageNav = (
        <Nav onSelect={this.onNavSelect} aria-label="Nav">
        // get the list of maps
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

    const maps = [
      {name: "sample", url: "/maps/samplemap.json" },
      {name: "melee",  url: "/maps/meleemap.json"  },
      {name: "wizard", url: "/maps/wizardmap.json" }
    ]

    const hm = ( props: RouteComponentProps<any> ) => {
      const mapname = props.match.params.name
      // find the map spec with the right name
      let mapspec = maps[0]
      for (const s of maps) {
        if (s.name === mapname) { mapspec = s }
      }
      return <HexmapCanvas hexmapurl={mapspec.url} orientation={Orientation.Portrait} />
    }
    // Define the actual page layout
    return (
        <Page header={Header} sidebar={Sidebar} isManagedSidebar={true} >
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
        <Route path="/maps/:name" component={hm} />
        </PageSection>
        </Page>
    )
  }

  private onNavSelect = (groupId: number, itemId: number, event: React.FormEvent) => {
    this.setState({
      activeItem: groupId
    });
  };

};


export default Dashboard;