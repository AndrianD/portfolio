/* global $ */
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import {
  faChevronDown,
  faChevronUp,
  faBars,
  faTimes,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons'
import {
  faGithub,
  faStackOverflow,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons'

/**
 * Add all icons to the library so you can use it in your page
 * https://www.pullrequest.com/blog/webpack-fontawesome-guide/
 */
library.add(
  faChevronDown,
  faChevronUp,
  faBars,
  faTimes,
  faMapMarkerAlt,
  faGithub,
  faStackOverflow,
  faLinkedin,
)
dom.watch()

import '../scss/styles.scss'

$(function () {
  // Show current year
  $('#current-year').text(new Date().getFullYear())

  // Remove no-js class
  $('html').removeClass('no-js')

  // Animate to section when nav is clicked
  $('header a').on('click', function (e) {
    // Treat as normal link if no-scroll class
    if ($(this).hasClass('no-scroll')) return

    e.preventDefault()
    var heading = $(this).attr('href')
    var scrollDistance = $(heading).offset().top

    $('html, body').animate(
      {
        scrollTop: scrollDistance + 'px',
      },
      Math.abs(window.pageYOffset - $(heading).offset().top) / 1,
    )

    // Hide the menu once clicked if mobile
    if ($('header').hasClass('active')) {
      $('header, body').removeClass('active')
    }
  })

  // Scroll to top
  $('#to-top').on('click', function () {
    $('html, body').animate(
      {
        scrollTop: 0,
      },
      500,
    )
  })

  // Scroll to first element
  $('#lead-down span').on('click', function () {
    var scrollDistance = $('#lead').next().offset().top
    $('html, body').animate(
      {
        scrollTop: scrollDistance + 'px',
      },
      500,
    )
  })

  // Create timeline
  $('#experience-timeline').each(function () {
    const $this = $(this) // Store reference to this
    const $userContent = $this.children('div') // user content

    // Create each timeline block
    $userContent.each(function () {
      $(this)
        .addClass('vtimeline-content')
        .wrap(
          '<div class="vtimeline-point"><div class="vtimeline-block"></div></div>',
        )
    })

    // Add icons to each block
    $this.find('.vtimeline-point').each(function () {
      $(this).prepend(
        '<div class="vtimeline-icon"><i class="fa fa-map-marker-alt"></i></div>',
      )
    })

    // Add dates to the timeline if exists
    $this.find('.vtimeline-content').each(function () {
      var date = $(this).data('date')
      if (date) {
        // Prepend if exists
        $(this)
          .parent()
          .prepend('<span class="vtimeline-date">' + date + '</span>')
      }
    })
  })

  // Open mobile menu
  $('#mobile-menu-open').on('click', function () {
    $('header, body').addClass('active')
  })

  // Close mobile menu
  $('#mobile-menu-close').on('click', function () {
    $('header, body').removeClass('active')
  })

  // Load additional projects
  $('#view-more-projects').on('click', function (e) {
    e.preventDefault()
    $(this).fadeOut(300, function () {
      $('#more-projects').fadeIn(300)
    })
  })

  // Send email
  const sendEmail = $('#send-email')
  sendEmail.on('click', function () {
    document.location.href = 'mailto:project@relaxmerim.com'
  })
})
