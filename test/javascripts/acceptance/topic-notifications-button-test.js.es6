import { acceptance } from "helpers/qunit-helpers";
acceptance("Topic Notifications button", {
  loggedIn: true,
  setup() {
    const response = object => {
      return [
        200,
        { "Content-Type": "application/json" },
        object
      ];
    };

    server.post('/t/280/notifications', () => { // eslint-disable-line no-undef
      return response({});
    });
  }
});

test("Share Popup", () => {
  visit("/t/internationalization-localization/280");

  const notificationOptions = "#topic-footer-buttons .notification-options";

  andThen(() => {
    ok(
      exists(`${notificationOptions} .tracking`),
      "it should display the notification options button in the topic's footer"
    );
  });

  click(`${notificationOptions} .tracking`);
  click(`${notificationOptions} .dropdown-menu .watching`);

  andThen(() => {
    ok(
      exists(`${notificationOptions} .watching`),
      "it should display the right notification level"
    );

    ok(
      exists(".timeline-footer-controls .notification-options .watching"),
      'it should display the right notification level in topic timeline'
    );
  });
});
