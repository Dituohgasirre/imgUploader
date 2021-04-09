$(function() {
    $('#btn-like').on('click', function() {
        var self = this;
        fetch('/images/' + $(self).data('id') + '/like', {method: 'POST'})
        .then(function(resp) {
            return resp.json();
        })
        .then(function(res) {
            $('strong.like-count').text(res.likes)
        })
        .catch(function(err) {
            console.log(err)
            alert('出错了。')
        })
    })
})
