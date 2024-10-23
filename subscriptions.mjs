import { $fetch } from 'ofetch'

const headers = {
  Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NGQ1OWNlZi1kYmI4LTRlYTUtYjE3OC1kMjU0MGZjZDY5MTkiLCJqdGkiOiJkODY5NGJjYmQ2NmNlODY5ODU3NTBjMzk3NTBhMWE5Mjg4ODc5OTU3YzE5MTAxNzllMjczYTBkMTU3NzMzMzdlNjg4YTVhMWUzMWQzYjAyOCIsImlhdCI6MTcyOTE3OTQzMi43OTM3MjYsIm5iZiI6MTcyOTE3OTQzMi43OTM3MjgsImV4cCI6MjA0NDcxMjIzMi43NTE2MDUsInN1YiI6IjEzMzUwNzUiLCJzY29wZXMiOltdfQ.g7vhUoqAYgiTpZ9NtFsq7X9q5VAlhpTMhOFdOyzMA0Vw1qcJNn5KfbpoZX66k4psd8tckEO22fhXsls1S2LaYJUW509CcHaF-f7X6qJdLNKLjy9maMpwDAKMSN0Z1DypL684EoN3Fzo289i1YHNRQ_BJl7zzL34YJor5hLpm9wUrYuqKo33KLlGfcl9I3MbhyW4iN_29dfQCAVWe6VIOs2x055wHTGhZ_L4R8H59KZbs4JN0eHa-JGKTwMb9M3Xw0QlaM-uF5r_zxh_JSC8XS6u7J-_mMCS7EBLpFQHm7Qlo8PTaDf0-3pkZqoZ_Hp09V7esCCUROpbtb1bsDmhNGn-FHNA90OGC6G98srz3LfwxgO8KbcYYs9USCGShZ0uTtN2y0PLYzDQ7AqoH60ZCyo1OPei46oN1RddfY-IukgB-n-e4aWhB8VXnXqQEgt9Qz66OmS8FK4qEMGnlV-pl_7bHm0vO8FI352rdcSVjnb_KFi5b3FI4QdRnnM4JJeZs`,
}

async function getTeams() {
  let subscriptions
  let page = 1
  do {
    subscriptions = await $fetch('https://api.lemonsqueezy.com/v1/subscriptions', {
      query: {
        'filter[store_id]': '77345',
        // 'filter[product_id]': '280721',
        // 'filter[status]': 'active',
        'page[size]': 100,
        'page[number]': page,
      },
      headers,
    })
    for (const subscription of subscriptions.data) {
      console.log(subscription.attributes.user_name, subscription.attributes.product_name, subscription.attributes.variant_name, subscription.attributes.status, subscription.attributes.first_subscription_item.created_at)
      // console.log(subscription)
      const subscriptionItems = await $fetch(subscription.relationships['subscription-items'].links.related, {
        headers,
      })
      console.log(subscriptionItems.data[0].attributes)
    }
    page++
  } while (subscriptions.meta.page.lastPage >= page)
}

getTeams()