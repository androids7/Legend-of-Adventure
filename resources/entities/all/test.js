define('test', ['npc', 'peaceful'], function() {

    function getSize() {
        return 50;
    }

    function getHealth() {
        return 100000;
    }

    return {
        getData: function(sup) {
            var data = sup();
            data.proto = 'avatar';
            data.image = 'avatar';
            data.width = data.height = getSize();
            data.speed = 0.004;
            data.nametag = 'Test Player';
            return data;
        },
        nametag: function() {
            return 'Test Player';
        },
        getWidth: getSize,
        getHeight: getSize,
        getHealth: getHealth,

        type: function() {
            return 'test player';
        },

        getDirectionToBestTile: function(sup, wandering) {
            sendEvent(
                'par',
                trigger('getX') + ' ' +
                trigger('getY') + ' ' +
                'blue ' +
                '10 ' +
                '100'
            );
            if (wandering) {
                return getDirectionToBestTile();
            } else {
                return pathToBestTile();
            }
        },

        seenEntity: function(sup, id) {
            if (getType(id) === 'player') {
                trigger('chase', id);
            }
        },

        // noop wander
        wander: function() {}
    };
});
