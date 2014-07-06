define('homely', ['sentient'], function() {

    var sprites = [
        'homely1',
        'homely2',
        'homely3',
        'old_woman1',
        'old_woman2'
    ];

    var image = sprites[Math.random() * sprites.length | 0];

    var names = [
        'Carl',
        'Bob',
        'Jordan',
        'Little Timmy',
        'Sips',
        'Bilbo',
        'Kip',
        'Tina',
        'Grandma'
    ];

    var name = names[Math.random() * names.length | 0];

    function getSize() {
        return 50;
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
            data.type = 'homely';
            data.image = image;
            data.width = data.height = getSize();
            data.maxHealth = 75;
            data.speed = 0.00075;
            data.nametag = name;
            return data;
        },
        getWidth: getSize,
        getHeight: getSize
    };
});
