(function($, ElementQueries) {
  document.addEventListener("arlojscontrolsloaded", function() {
    var platformID = "websitetestdata.arlo.co"; // Change platformID to point at your own account

    var filter = {
      moduleType: "Filters",
      targetElement: "#filters",
      template: "#filter-template",
      filterControlId: 1
    };

    var eventList = {
      moduleType: "UpcomingEvents",
      targetElement: "#upcoming-events",
      template: "#upcoming-events-template",
      maxCount: 12,
      filterControlId: 1,
      includeLoadMoreButton: true,
      loadMoreButtonText: "Show More",
      includeArloLink: false,
      smartDateFormats: {
        startDay: "DD"
      },
      customUrls: {
        eventtemplate: "/course-template/",
        venue: "/venue/",
        presenter: "/presenter/"
      },
      callbacks: {
        onShow: eventListOnShowCallback
      }
    };

    var app = new window.ArloWebControls();

    app.start({
      platformID: platformID,
      showDevErrors: false,
      modules: [eventList, filter]
    });

    /* ----- Callback function ----- */

    // "OnShow" callback
    function eventListOnShowCallback(getEventListItemsFunction) {
      var listItems = getEventListItemsFunction();
      var imageArr = [  "http://media.istockphoto.com/photos/designer-drawing-website-ux-app-development-picture-id628609112?k=6&m=628609112&s=170667a&w=0&h=bVSiVtnnfHLHX4_yr6List1__XqvL3fySYvD08_wkZQ=",
  "http://media.istockphoto.com/photos/checking-new-menu-picture-id503492356?k=6&m=503492356&s=170667a&w=0&h=SWTRi7aE1hQ4jOFJa7D6zqOc4IpkQNu2xnm7-tV6cEE=",
  "http://media.istockphoto.com/photos/serious-strategising-picture-id505766677?k=6&m=505766677&s=170667a&w=0&h=nwfdHw-rix0l041wlJD3nOafZqT2wd3-bf5scAaiPfY=",
  "http://media.istockphoto.com/photos/get-going-get-growing-picture-id628265890?k=6&m=628265890&s=170667a&w=0&h=R4AzTIGTudYjjiOC88ymgSFe3GNT8MEpAfSooNjurTw=",
  "http://media.istockphoto.com/photos/wood-open-sign-board-hang-on-shop-wood-door-picture-id586731466?k=6&m=586731466&s=170667a&w=0&h=r0kACwrbT2IByUz-vndeoxI3CuYPf-J0nin0Yo_zutk=",
  "http://media.istockphoto.com/photos/proud-to-be-a-dressmaker-picture-id180719017?k=6&m=180719017&s=170667a&w=0&h=TXSvH-wyOPcda63iNMzHp5V6XALVtd6yo3dSQjHguQk=",
  "http://media.istockphoto.com/photos/hand-writes-with-a-pen-in-a-notebook-picture-id481187762?k=6&m=481187762&s=170667a&w=0&h=8Xyh04ScckFFA8xK_dbupOrCQmciRuQLfOxll_rm8BU=",
  "http://media.istockphoto.com/photos/book-and-glass-loupe-picture-id133313561?k=6&m=133313561&s=170667a&w=0&h=eDSzDMt1NxT4m_wOeCiYOlTiOxXtWvxez_fHdZZeAVw=",
  "http://media.istockphoto.com/photos/putting-together-a-plan-picture-id524376782?k=6&m=524376782&s=170667a&w=0&h=gOoh9DrzUnVj9i6DJ4dJRh2qkINSBGgNPqf2WlhdW80=",
  "http://media.istockphoto.com/photos/cycling-class-at-the-gym-picture-id596804694?k=6&m=596804694&s=170667a&w=0&h=p_-ZcRczh-n1ogNMQ6a8f0egej3AJG-32r3VNJekkCk=",
  "http://media.istockphoto.com/photos/rustic-wedding-bouquet-with-pink-roses-and-lisianthus-flowers-picture-id530922612?k=6&m=530922612&s=170667a&w=0&h=Qt66JfQjIGM-nGsGKf4vXiTpvknaD4wwNAwPbUgUBNQ=",
  "http://media.istockphoto.com/photos/traveler-looks-at-landscape-picture-id625752272?k=6&m=625752272&s=170667a&w=0&h=EKHIB5vuXUhU5onmHAywFGGdu4DBebpH7WjfW85am6M=",
  "http://media.istockphoto.com/photos/white-flower-growing-on-crack-street-soft-focus-picture-id521033980?k=6&m=521033980&s=170667a&w=0&h=iisBcr4jJvJy8K-KP6fAW9T75_zULRv2CWUHxPzb040="];
      
      var cardImages = $('.arlo-event-image');
      var cardSummary = $('.arlo-summary');
      var strMaxLength = 350;
      
      $.each(cardImages, function(index, ele) {
        $(ele).css('background-image', 'url(' + imageArr[index % imageArr.length] + ')');
      });
      
      $.each(cardSummary, function (index, ele) {
          var str = $(ele).text()
          $(ele).text(strChopper(str));
      });

      function strChopper(str) {
          if (str.length > strMaxLength) {
              str = str.substring(0, strMaxLength) + '...';
          }
          return str;
      }
      
      ElementQueries.init();

      // Hide timezone selector if there are no online events
      if ($(".arlo-online").length < 1) {
        $(".arlo-timezone-select").hide();
      } else {
        $(".arlo-timezone-select").show();
        $(".arlo-timezone-select").parent().css("float", "right");
      }

      // Set up tooltips
      $.each(listItems, function(index, listItem) {
        var tooltipElement = $(listItem).find('[data-toggle="tooltip"]')[0];
        if (tooltipElement) {
          var toolTipContent = $(listItem).find(".tooltipcontent")[0];
          if (toolTipContent) {
            $(tooltipElement).attr(
              "data-original-title",
              $(toolTipContent).html()
            );
            $(tooltipElement).tooltip();
          }
        }
      });
    }
  });

  window.locationfiltertoggle = function(filter, $) {
    //jshint unused:false
    window.ElementQueries.init();
  };

  window.updateTemplateTagNames = function(filterModel, $) {
    var deleteFilterIndexes = [];
    $.each(filterModel.attributes.Values, function(index, filterValue) {
      switch (filterValue.Label) {
        case "Web_Public":
          filterValue.Label = "Public";
          break;
        case "Web_LiveOnline":
          filterValue.Label = "Live Online";
          break;
        case "Web_PrivateOnsite":
          filterValue.Label = "Private Onsite";
          break;
        case "Web_SelfpacedOnline":
          filterValue.Label = "Self Paced Online";
          break;
        default:
          deleteFilterIndexes.push(index);
      }
    });

    $.each(deleteFilterIndexes, function(index, value) {
      filterModel.attributes.Values.splice(value - index, 1);
    });

    $("#arlo-filter-toggle").click(function() {
      $(this).parent().toggleClass("arlo-show-filter");
    });
  };
})(jQuery, window.ElementQueries);
