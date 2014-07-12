define('trader', ['peaceful'], function() {

    var names = [
        'Tom',
        'Bob',
        'Alfred',
        'Joe'
    ];

    var name = 'Trader ' + names[Math.random() * names.length | 0];

    function getSize() {
        return 50;
    }

    function getHealth() {
        return 200;
    }

    return {
        setup: function(sup) {
            sup();
            trigger('schedule', function() {
                trigger('wander');
            }, 100);
        },

        getData: function(sup) {
            var data = sup();
            data.proto = 'avatar';
            data.image = 'npc';
            data.width = data.height = getSize();
            data.speed = 0.004;
            data.nametag = name;
            return data;
        },
        getWidth: getSize,
        getHeight: getSize,
        getHealth: getHealth,

        type: function() {
            return 'trader';
        }
    };
});