# AMP Email fallback - how will it work in normal mail programs?

<img src="https://docs.google.com/drawings/d/e/2PACX-1vS0te50ilkPBpT8spoLTkLf5ShoLHddV2tPCo5e1aX5NWZBxkzdyHpi3UghC7cXYnbF-7OIz9Zy8QU8/pub?w=1024&amp;h=512" title="amp email fallback - amp for emails">

AMP is a super interesting concept made by Google, that enables third-parties to safely cache websites while preserving the users' privacy.

Now AMP is also available for email, but then the question how does **amp email fallback** if it is not supported?

First of all, to even delivery AMP emails to GMail users, you have to qualify for all these criterias; one of them is the email deliver has to already send a ton of emails! You can see it here: <https://developers.google.com/gmail/ampemail/register>

> Consistent history of sending a high volume of mail from your domain (order of hundred emails a day minimum to Gmail) for a few weeks at least.

That prevents many people from even sending amp emails, but you can send it through providers like SendGrid and Sparkpost. Sparkpost tells you how to do it here, <https://www.sparkpost.com/docs/user-guide/amp-for-email/>. Sendgrid they annonced that they will support it here, "coming soon" <https://sendgrid.com/blog/coming-soon-sendgrid-support-for-amp-for-email/>

And then secondly, how amp will fallback is that amp emails have to be sent with a special content-type, namely `Content-Type: text/x-amp-html; charset="UTF-8"`

So email clients that don't support AMP emails, will simply show the `text/html`.

Normally email clients send two different types, one simple which is just text and one formatted. That is how you can send some text that is bold, `text/plain` would not support that.

This is an example of what an email client will parse:

```
From:  Person A <persona@gmail.com>
To: Person B <personb@gmail.com>
Subject: An AMP email!
Content-Type: multipart/alternative; boundary="IAMJUSTARANDOMDIVIDER"

--IAMJUSTARANDOMDIVIDER
Content-Type: text/plain; charset="UTF-8"; format=flowed; delsp=yes

Hi Person B

--IAMJUSTARANDOMDIVIDER
Content-Type: text/x-amp-html; charset="UTF-8"

<!doctype html>
<html ⚡4email>
<head>
  <meta charset="utf-8">
  <style amp4email-boilerplate>body{visibility:hidden}</style>
  <script async src="https://cdn.ampproject.org/v0.js"></script>
</head>
<body>
Hi Person B
</body>
</html>
--IAMJUSTARANDOMDIVIDER
Content-Type: text/html; charset="UTF-8"

<strong>Hi Person B</strong>
--IAMJUSTARANDOMDIVIDER--
```

You can see the messages, all telling the same message, but has different formatting. So that is simply how AMP email will fallback.
