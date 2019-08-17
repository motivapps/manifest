import React from 'react';
//import Expo from 'expo';
import ExpoPhaser from 'expo-phaser';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import { GLView } from 'expo-gl';
import '@expo/browser-polyfill';

const Assets = {
  'man.png': require('./assets/man.png'),
  //'man.json': require('./assets/man.json'),
};

export default class GameTwo extends React.Component {
  state = { loading: true };
  async componentWillMount() {
    const downloads = [];
    for (let key of Object.keys(Assets)) {
      const asset = Asset.fromModule(Assets[key]);
      downloads.push(asset.downloadAsync());
    }
    await Promise.all(downloads);
    this.setState({ loading: false });
  }
  render() {
    if (this.state.loading) {
      return <AppLoading />;
    }

    return (
      <GLView
        style={{ flex: 1 }}
        onContextCreate={context => startGame({ context })}
      />
    );
  }
}

function startGame({ context }) {
  const game = ExpoPhaser.game({ context });

  game.state.add('Playable', {
    preload: function () {
      //const atlas = Asset.fromModule(Assets['man.json']).localUri;
      const texture = Asset.fromModule(Assets['man.png']).localUri;
      game.load.atlasJSONHash('man', texture, atlas);
    },
    create: function () {
      game.stage.backgroundColor = '#4488AA';

      game.physics.startSystem(Phaser.Physics.ARCADE);

      //  Set the world (global) gravity
      game.physics.arcade.gravity.y = 100;

      const man = game.add.sprite(200, 200, 'man');
      game.physics.enable([man], Phaser.Physics.ARCADE);

      //  Here we add a new animation called 'run'
      //  We haven't specified any frames because it's using every frame in the texture atlas

      man.animations.add('run');
      man.body.collideWorldBounds = true;
      man.body.bounce.y = 0.8;
      man.body.gravity.y = 200;

      //  And this starts the animation playing by using its key ("run")
      //  15 is the frame rate (15fps)
      //  true means it will loop when it finishes
      man.animations.play('run', 15, true);
    },
    update: function () { },
  });

  game.state.start('Playable');
}