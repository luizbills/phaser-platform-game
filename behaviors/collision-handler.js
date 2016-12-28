;(function (Phaser, NULL) {

    var CollisionHandler = {

        // default settings
        options: {
            method: 'collide', // or 'overlap'
            targets: NULL,
            collideCallback: NULL,
            processCallback: NULL,
            callbackContext: NULL
        },

        update: function (object, opts) {
            var targets = opts.targets;

            // multiple targets
            if (Array.isArray(targets) === true) {
                var max = opts.targets.length;
                for (var i = 0; i < max; ++i ) {
                    object.game.physics.arcade[opts.method](object, targets[i], opts.collideCallback, opts.processCallback, opts.callbackContext);
                }
            // single target
            } else {
                object.game.physics.arcade[opts.method](object, targets, opts.collideCallback, opts.processCallback, opts.callbackContext);
            }
        }
    };

    if (Phaser !== NULL) {
        Phaser.Behavior = Phaser.Behavior || {}
        Phaser.Behavior.CollisionHandler = CollisionHandler
    }

})(window.Phaser)
