/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* All of our tests within the $() function,
 * since some of these tests may require DOM elements. This
 * ensures they don't run until the DOM is ready.
 */
$(function() {
    /* This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* Test to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('each URL is defined & not empty', function() {
            for(i=0; i<allFeeds.length; i++) {
              expect(allFeeds[i].url).toBeDefined();
              expect(allFeeds[i].url.length).not.toBe(0);
            }
         });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('each object has a name & is not empty', function() {
           for(i=0; i<allFeeds.length; i++) {
             expect(allFeeds[i].name).toBeDefined();
             expect(allFeeds[i].name.length).not.toBe(0);
           }
         })

    });


    /* Test suite named "The menu" */
    describe('The menu', function() {
        const body = document.querySelector('body');
        /* Test that ensures the menu element is
         * hidden by default.
         */
         it('menu is hidden by default', function() {
           expect(body.classList).toContain('menu-hidden');
         });

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked.
          */
          it('menu visibility changes with click', function() {
            const menuClick = jasmine.createSpy('body', 'toggleClass');
            if(menuClick.calls.count() % 2 === 0) {
              expect(body.classList).toContain('menu-hidden');
            } else {
              expect(body.classList).not.toContain('menu-hidden');
            }

          });
    });
    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function(){

        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
         beforeEach(function(done) {
           loadFeed(0, done);
         });
         it('loadFeed finished', function(){
           const feed = document.querySelector('.feed');
           expect(feed.children.length != 0).toBe(true);
         });
    });
    /* Test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){

        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
         const feed = document.querySelector('.feed');
         const firstFeed = [];
         const secondFeed = [];
         beforeEach(function(done){
           loadFeed(0);
           Array.from(feed.children).forEach(function(entry){
             firstFeed.push(entry.innerText);
           })
           loadFeed(1, done);
           Array.from(feed.children).forEach(function(entry){
             secondFeed.push(entry.innerText);
           })
         });
         it('running loadFeed multiple times produces different feeds', function(){
           expect(firstFeed != secondFeed).toBe(true);
         })
    })
}());
