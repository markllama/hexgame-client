import * as PropTypes from 'prop-types';
import * as React from 'react';

interface IDashboardProps {
  games?: string;
}

export class Dashboard extends React.Component<IDashboardProps, any> {

  public static propTypes = {
    games: PropTypes.string
  }

  public static defaultProps = {
    games: "sample game"
  }

  public render () {
    return (
      <div className="dashboard">
        <h1>Hey there</h1>
      </div>
    )
  }
}

export default Dashboard;