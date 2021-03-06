import React, {Component} from 'react';
import {
  provideReactor,
  nuclearComponent
} from 'nuclear-js-react-addons';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import getters from '../getters';

import Logo from './logo.jsx';
import Player from './player.jsx';
import Playlist from './playlist.jsx';
import Library from './library.jsx';
import Listeners from './master_mode_listeners.jsx';

import withContext from '../decorators/withContext';
import withStyles from '../decorators/withStyles';

import styles from '../../sass/mpdisco.scss';

@provideReactor
@nuclearComponent(props => {
  window.listeners = getters.listeners;
  return {
    me: getters.me,
    master: getters.currentMaster,
    status: getters.currentStatus,
    cover: getters.currentCover,
    song: getters.currentSong,
    library: getters.library,
    playlist: getters.playlist,
    listeners: getters.listeners
  };
})
@withContext
@withStyles(styles)
@DragDropContext(HTML5Backend)
class MasterMode extends Component {
  render () {
    const {
      me,
      song,
      cover,
      status,
      library,
      listeners,
      playlist,
      master
    } = this.props;

    const enabled = !!(master && master === me.get('userid'));

    return (
      <div id="container" role="main">
        <header id="player-head">
          <Logo cover={cover}
                blurRadius={10}
                />
          <Player song={song}
                  enabled={enabled}
                  />
        </header>
        <main>
          <Library  library={library}
                    enabled={enabled}
                    />
          <Playlist playlist={playlist}
                    song={song}
                    status={status}
                    enabled={enabled}
                    />
          <Listeners  listeners={listeners}
                      master={master}
                      me={me}
                      />
        </main>

        <audio src={ 'http://' + window.location.hostname + ':5000' } autoPlay>
          Your browser does not support the <code>audio</code> element.
        </audio>
      </div>
    );
  }
}

export default MasterMode;
