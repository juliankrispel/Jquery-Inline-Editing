/* 
* To enable Inline Editing add the following attributes to a an 
* element and the script will act on all form elements 
*
* Usage: Simply have an element with data-toggle="inline-editing" and data-url="http://yourserver.com/endpoint" like this
* <div data-toggle="inline-editing" data-url="http://..."></div>
*
* Use data-array attribute to convert comma seperated values to an array
*/

(function(){
    $.fn.inlineEditing = function(){

        var url = $(this).attr('data-url');

        var isEmpty = function(string){
            if(!string) return true;
            return string.replace(/ /gi, '').length == 0;
        };

        var syncInput = function(el, url){
            var reg = /([a-zA-Z]*)\[([a-zA-Z]*)\]/;
            var matches = el.attr('name').match(reg);
            var value = el.data('array') ? el.val().split(',') : el.val();
            var data = {};
            data[matches[1]] = {};
            data[matches[1]][matches[2]] = value;
            $.ajax({
                contentType: 'application/json',
                dataType: 'json',
                url: url,
                type: 'PUT',
                data: JSON.stringify(data),
                success: function(e){
                    // do something with event
                }
            })
        }

        $(this).find('input', 'textarea').each(function(){
            if(isEmpty($(this).attr('value')))
               $(this).addClass('empty');
        });

        var triggerSync = function(){
            if(isEmpty($(this).val()))
                $(this).addClass('empty');
            else
                $(this).removeClass('empty');
            syncInput($(this), url);
        }

        $(this).on('change', 'select', triggerSync);
        $(this).on('change', 'textarea', triggerSync);
        $(this).on('change', 'input:not(.select2-container input)', triggerSync);
    }

//    $(document).ready(function(){
//        $('[data-toggle="inline-editing"]').inlineEditing();
//    });
})();
