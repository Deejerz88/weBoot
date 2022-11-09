const db = require('../config/connection');
const { User, Product } = require('../models');

db.once('open', async () => {
  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      title: 'Send Help',
      images: [
        'https://uc97ce9d771ac8d54171cf4316c1.previews.dropboxusercontent.com/p/thumb/ABu3nprf_dMT9I_PvdWasZIvaVviV4rjGSM5713dxRxuwIMJa6J3DmOb1TR247PWNTbsUHysi_DJwunSUhOfsCIOZ4-hCNFT7LKcbpeyQTBcZFxQdQZL4oeRx_2PBpjieAnDl86F3oIi2cGQC3A94k7Y9xOlPwnGqs70S0_27PTTvhYFjDe2ipK2Sco_rvxEB1OC3mNwUy777Tuk-s5SjgbwBfK3qmmgyUs2VayxihYL-XgF8Qf_MgMSODZt60XqBB-2-TZ0qkP0qbzlbHMafPhmZ8KXymQpJKnSOdRy4VVzbFFiFcUyfVrpfhn9NGpFqxmq862eEIIbqk9sqIw7hyyLWmFEmPG-rN8mrlyBfkN-feOENyMAGTKSiNC-cq_9Pxc/p.png',
        'https://uc36193f5c7527c25be3144550c4.previews.dropboxusercontent.com/p/thumb/ABtPQ3v7uM4bbLLC7Kzn9KyTn1bXasOPZldVKrZFc6qTX0tSkttDVunZ2N-ElPbYLbFeam6oZ8J4_Vwb-CtKQC5adpyzZkOiNKrmQzs50lqqwkLr9E1vbpkCuDHL3VfPrpGu0-bd08RmPiKGgxeeKnNw0JgboVVA4nmtRbq0kQWVo1tX0YjDsI6iShWEEcN2x50CIfzRN4Bqtg01ohBFn-dIlMHdPfkzV1uqPsnLWuZUyGMx6kqs-U3eYooA9X49MfNzoh4YZll8Z5pdF_3kCxhiPIcitxKm8C0eGTfoiYdbKe-xt37_NkpQRtm-IWLAZCkMFVB5IQ9KIECV9peB9g-31MJk8nkkWDeyb2G-r9Rbej6g-PLwjVx39hqcMejxo_g/p.png',
        'https://uc22d5e3199253b7c3786698bd66.previews.dropboxusercontent.com/p/thumb/ABvyOAfPrD2h6roPFKvmBKVHOQohueeOFST7XBgai6Y8r9dJJgmmWZCCTYaMM-IQm0MEcwn2quGs57TnwrTUEwT5TD1fioZuU0ybMKwYYALoeZAhUHcBUnXkdxMx57GWgibkaoOmlq5CvhNcjls3-NBa2BQ5wugnFx_yqWkVV1tTggNcuLmzT9jwwfksDJGjEdu_Wai6R_PHNRQMwXh2Q1LiSoJRxyym6DmAEzdmJ0a3pl2_NDnaPNU8KhHZXIZuhzgk8sGEXgy8j9PW8mey00p1mgYOhBYTWy3c4L0ZFpcVaYwUvCaIu74Dknoy1tCRt5gqpxhHDcsivjfvkh4hrv4g_h0LNJWtO88iigENi8MTvRImarZIRDE_Gbg_xSyK7rQ/p.png',
        'https://uc31a0ac450a8683cda469e86b5f.previews.dropboxusercontent.com/p/thumb/ABv5h2DCUmprTWQ0bR0E7WpJnPh3SZ15xs1fpMYjVLvdTdKNGT2qUmx2w_0C9SFOK8D93TM16m1eAodgYFbRO1t3n3a0Kt8I9PKkx8Bcmou7a_6DYd1j8eLHVjAOPpkxh82mw8bxj4NuOy1to60be2YKYp-fjO1cntSGh2qwrowZC0_Mi_VEBnCXemrYXbfzJ0RyuS51ZD5kCcDf8qkof8RHm6uEFLlhTD8pMlB-aCKgPEXR1OBsvrYAOPqp13KO41_VmFfa6qJMxGsZCJ7iOQS9KMEBjHpfrHcYWkQeinbNjwOzBtlSJf0qCSehPCpOpMQeFfkFQMOgSx1UnyOeqJGMEvYcOxYq5w0t9dHaSj-SH0vpkNYx_Dr-xc9ihrZ29wE/p.png',
      ],
      description: 'Send Help',
      category: 'Shirts',
      quantity: 30,
      price: 25,
      compare_at_price: null,
      vendor: 'weBoot',
      tags: ['Funny', 'Shirts', 'Cotton', 'Top', 'Graphic'],
      reviews: [{ rating: 3, body: 'This is a great shirt!' }],
      upc: Math.floor(Math.random() * 1000000000),
      variants: [
        {
          id: 1,
          size: 'S',
          color: 'Black',
          inventory: 10,
          image:
            'https://uc97ce9d771ac8d54171cf4316c1.previews.dropboxusercontent.com/p/thumb/ABu3nprf_dMT9I_PvdWasZIvaVviV4rjGSM5713dxRxuwIMJa6J3DmOb1TR247PWNTbsUHysi_DJwunSUhOfsCIOZ4-hCNFT7LKcbpeyQTBcZFxQdQZL4oeRx_2PBpjieAnDl86F3oIi2cGQC3A94k7Y9xOlPwnGqs70S0_27PTTvhYFjDe2ipK2Sco_rvxEB1OC3mNwUy777Tuk-s5SjgbwBfK3qmmgyUs2VayxihYL-XgF8Qf_MgMSODZt60XqBB-2-TZ0qkP0qbzlbHMafPhmZ8KXymQpJKnSOdRy4VVzbFFiFcUyfVrpfhn9NGpFqxmq862eEIIbqk9sqIw7hyyLWmFEmPG-rN8mrlyBfkN-feOENyMAGTKSiNC-cq_9Pxc/p.png',
        },
        {
          id: 2,
          size: 'M',
          color: 'Black',
          inventory: 10,
          image:
            'https://uc97ce9d771ac8d54171cf4316c1.previews.dropboxusercontent.com/p/thumb/ABu3nprf_dMT9I_PvdWasZIvaVviV4rjGSM5713dxRxuwIMJa6J3DmOb1TR247PWNTbsUHysi_DJwunSUhOfsCIOZ4-hCNFT7LKcbpeyQTBcZFxQdQZL4oeRx_2PBpjieAnDl86F3oIi2cGQC3A94k7Y9xOlPwnGqs70S0_27PTTvhYFjDe2ipK2Sco_rvxEB1OC3mNwUy777Tuk-s5SjgbwBfK3qmmgyUs2VayxihYL-XgF8Qf_MgMSODZt60XqBB-2-TZ0qkP0qbzlbHMafPhmZ8KXymQpJKnSOdRy4VVzbFFiFcUyfVrpfhn9NGpFqxmq862eEIIbqk9sqIw7hyyLWmFEmPG-rN8mrlyBfkN-feOENyMAGTKSiNC-cq_9Pxc/p.png',
        },
        {
          id: 3,
          size: 'L',
          color: 'Black',
          inventory: 10,
          image:
            'https://uc97ce9d771ac8d54171cf4316c1.previews.dropboxusercontent.com/p/thumb/ABu3nprf_dMT9I_PvdWasZIvaVviV4rjGSM5713dxRxuwIMJa6J3DmOb1TR247PWNTbsUHysi_DJwunSUhOfsCIOZ4-hCNFT7LKcbpeyQTBcZFxQdQZL4oeRx_2PBpjieAnDl86F3oIi2cGQC3A94k7Y9xOlPwnGqs70S0_27PTTvhYFjDe2ipK2Sco_rvxEB1OC3mNwUy777Tuk-s5SjgbwBfK3qmmgyUs2VayxihYL-XgF8Qf_MgMSODZt60XqBB-2-TZ0qkP0qbzlbHMafPhmZ8KXymQpJKnSOdRy4VVzbFFiFcUyfVrpfhn9NGpFqxmq862eEIIbqk9sqIw7hyyLWmFEmPG-rN8mrlyBfkN-feOENyMAGTKSiNC-cq_9Pxc/p.png',
        },
        {
          id: 4,
          size: 'XL',
          color: 'Black',
          inventory: 10,
          image:
            'https://uc97ce9d771ac8d54171cf4316c1.previews.dropboxusercontent.com/p/thumb/ABu3nprf_dMT9I_PvdWasZIvaVviV4rjGSM5713dxRxuwIMJa6J3DmOb1TR247PWNTbsUHysi_DJwunSUhOfsCIOZ4-hCNFT7LKcbpeyQTBcZFxQdQZL4oeRx_2PBpjieAnDl86F3oIi2cGQC3A94k7Y9xOlPwnGqs70S0_27PTTvhYFjDe2ipK2Sco_rvxEB1OC3mNwUy777Tuk-s5SjgbwBfK3qmmgyUs2VayxihYL-XgF8Qf_MgMSODZt60XqBB-2-TZ0qkP0qbzlbHMafPhmZ8KXymQpJKnSOdRy4VVzbFFiFcUyfVrpfhn9NGpFqxmq862eEIIbqk9sqIw7hyyLWmFEmPG-rN8mrlyBfkN-feOENyMAGTKSiNC-cq_9Pxc/p.png',
        },
        {
          id: 5,
          size: 'S',
          color: 'Blue',
          inventory: 10,
          image:
            'https://uc36193f5c7527c25be3144550c4.previews.dropboxusercontent.com/p/thumb/ABtPQ3v7uM4bbLLC7Kzn9KyTn1bXasOPZldVKrZFc6qTX0tSkttDVunZ2N-ElPbYLbFeam6oZ8J4_Vwb-CtKQC5adpyzZkOiNKrmQzs50lqqwkLr9E1vbpkCuDHL3VfPrpGu0-bd08RmPiKGgxeeKnNw0JgboVVA4nmtRbq0kQWVo1tX0YjDsI6iShWEEcN2x50CIfzRN4Bqtg01ohBFn-dIlMHdPfkzV1uqPsnLWuZUyGMx6kqs-U3eYooA9X49MfNzoh4YZll8Z5pdF_3kCxhiPIcitxKm8C0eGTfoiYdbKe-xt37_NkpQRtm-IWLAZCkMFVB5IQ9KIECV9peB9g-31MJk8nkkWDeyb2G-r9Rbej6g-PLwjVx39hqcMejxo_g/p.png',
        },
        {
          id: 6,
          size: 'M',
          color: 'Blue',
          inventory: 10,
          image:
            'https://uc36193f5c7527c25be3144550c4.previews.dropboxusercontent.com/p/thumb/ABtPQ3v7uM4bbLLC7Kzn9KyTn1bXasOPZldVKrZFc6qTX0tSkttDVunZ2N-ElPbYLbFeam6oZ8J4_Vwb-CtKQC5adpyzZkOiNKrmQzs50lqqwkLr9E1vbpkCuDHL3VfPrpGu0-bd08RmPiKGgxeeKnNw0JgboVVA4nmtRbq0kQWVo1tX0YjDsI6iShWEEcN2x50CIfzRN4Bqtg01ohBFn-dIlMHdPfkzV1uqPsnLWuZUyGMx6kqs-U3eYooA9X49MfNzoh4YZll8Z5pdF_3kCxhiPIcitxKm8C0eGTfoiYdbKe-xt37_NkpQRtm-IWLAZCkMFVB5IQ9KIECV9peB9g-31MJk8nkkWDeyb2G-r9Rbej6g-PLwjVx39hqcMejxo_g/p.png',
        },
        {
          id: 7,
          size: 'L',
          color: 'Blue',
          inventory: 10,
          image:
            'https://uc36193f5c7527c25be3144550c4.previews.dropboxusercontent.com/p/thumb/ABtPQ3v7uM4bbLLC7Kzn9KyTn1bXasOPZldVKrZFc6qTX0tSkttDVunZ2N-ElPbYLbFeam6oZ8J4_Vwb-CtKQC5adpyzZkOiNKrmQzs50lqqwkLr9E1vbpkCuDHL3VfPrpGu0-bd08RmPiKGgxeeKnNw0JgboVVA4nmtRbq0kQWVo1tX0YjDsI6iShWEEcN2x50CIfzRN4Bqtg01ohBFn-dIlMHdPfkzV1uqPsnLWuZUyGMx6kqs-U3eYooA9X49MfNzoh4YZll8Z5pdF_3kCxhiPIcitxKm8C0eGTfoiYdbKe-xt37_NkpQRtm-IWLAZCkMFVB5IQ9KIECV9peB9g-31MJk8nkkWDeyb2G-r9Rbej6g-PLwjVx39hqcMejxo_g/p.png',
        },
        {
          id: 8,
          size: 'XL',
          color: 'Blue',
          inventory: 10,
          image:
            'https://uc36193f5c7527c25be3144550c4.previews.dropboxusercontent.com/p/thumb/ABtPQ3v7uM4bbLLC7Kzn9KyTn1bXasOPZldVKrZFc6qTX0tSkttDVunZ2N-ElPbYLbFeam6oZ8J4_Vwb-CtKQC5adpyzZkOiNKrmQzs50lqqwkLr9E1vbpkCuDHL3VfPrpGu0-bd08RmPiKGgxeeKnNw0JgboVVA4nmtRbq0kQWVo1tX0YjDsI6iShWEEcN2x50CIfzRN4Bqtg01ohBFn-dIlMHdPfkzV1uqPsnLWuZUyGMx6kqs-U3eYooA9X49MfNzoh4YZll8Z5pdF_3kCxhiPIcitxKm8C0eGTfoiYdbKe-xt37_NkpQRtm-IWLAZCkMFVB5IQ9KIECV9peB9g-31MJk8nkkWDeyb2G-r9Rbej6g-PLwjVx39hqcMejxo_g/p.png',
        },
        {
          id: 9,
          size: 'S',
          color: 'Green',
          inventory: 10,
          image:
            'https://uc22d5e3199253b7c3786698bd66.previews.dropboxusercontent.com/p/thumb/ABvyOAfPrD2h6roPFKvmBKVHOQohueeOFST7XBgai6Y8r9dJJgmmWZCCTYaMM-IQm0MEcwn2quGs57TnwrTUEwT5TD1fioZuU0ybMKwYYALoeZAhUHcBUnXkdxMx57GWgibkaoOmlq5CvhNcjls3-NBa2BQ5wugnFx_yqWkVV1tTggNcuLmzT9jwwfksDJGjEdu_Wai6R_PHNRQMwXh2Q1LiSoJRxyym6DmAEzdmJ0a3pl2_NDnaPNU8KhHZXIZuhzgk8sGEXgy8j9PW8mey00p1mgYOhBYTWy3c4L0ZFpcVaYwUvCaIu74Dknoy1tCRt5gqpxhHDcsivjfvkh4hrv4g_h0LNJWtO88iigENi8MTvRImarZIRDE_Gbg_xSyK7rQ/p.png',
        },
        {
          id: 10,
          size: 'M',
          color: 'Green',
          inventory: 10,
          image:
            'https://uc22d5e3199253b7c3786698bd66.previews.dropboxusercontent.com/p/thumb/ABvyOAfPrD2h6roPFKvmBKVHOQohueeOFST7XBgai6Y8r9dJJgmmWZCCTYaMM-IQm0MEcwn2quGs57TnwrTUEwT5TD1fioZuU0ybMKwYYALoeZAhUHcBUnXkdxMx57GWgibkaoOmlq5CvhNcjls3-NBa2BQ5wugnFx_yqWkVV1tTggNcuLmzT9jwwfksDJGjEdu_Wai6R_PHNRQMwXh2Q1LiSoJRxyym6DmAEzdmJ0a3pl2_NDnaPNU8KhHZXIZuhzgk8sGEXgy8j9PW8mey00p1mgYOhBYTWy3c4L0ZFpcVaYwUvCaIu74Dknoy1tCRt5gqpxhHDcsivjfvkh4hrv4g_h0LNJWtO88iigENi8MTvRImarZIRDE_Gbg_xSyK7rQ/p.png',
        },
        {
          id: 11,
          size: 'L',
          color: 'Green',
          inventory: 10,
          image:
            'https://uc22d5e3199253b7c3786698bd66.previews.dropboxusercontent.com/p/thumb/ABvyOAfPrD2h6roPFKvmBKVHOQohueeOFST7XBgai6Y8r9dJJgmmWZCCTYaMM-IQm0MEcwn2quGs57TnwrTUEwT5TD1fioZuU0ybMKwYYALoeZAhUHcBUnXkdxMx57GWgibkaoOmlq5CvhNcjls3-NBa2BQ5wugnFx_yqWkVV1tTggNcuLmzT9jwwfksDJGjEdu_Wai6R_PHNRQMwXh2Q1LiSoJRxyym6DmAEzdmJ0a3pl2_NDnaPNU8KhHZXIZuhzgk8sGEXgy8j9PW8mey00p1mgYOhBYTWy3c4L0ZFpcVaYwUvCaIu74Dknoy1tCRt5gqpxhHDcsivjfvkh4hrv4g_h0LNJWtO88iigENi8MTvRImarZIRDE_Gbg_xSyK7rQ/p.png',
        },
        {
          id: 12,
          size: 'XL',
          color: 'Green',
          inventory: 10,
          image:
            'https://uc22d5e3199253b7c3786698bd66.previews.dropboxusercontent.com/p/thumb/ABvyOAfPrD2h6roPFKvmBKVHOQohueeOFST7XBgai6Y8r9dJJgmmWZCCTYaMM-IQm0MEcwn2quGs57TnwrTUEwT5TD1fioZuU0ybMKwYYALoeZAhUHcBUnXkdxMx57GWgibkaoOmlq5CvhNcjls3-NBa2BQ5wugnFx_yqWkVV1tTggNcuLmzT9jwwfksDJGjEdu_Wai6R_PHNRQMwXh2Q1LiSoJRxyym6DmAEzdmJ0a3pl2_NDnaPNU8KhHZXIZuhzgk8sGEXgy8j9PW8mey00p1mgYOhBYTWy3c4L0ZFpcVaYwUvCaIu74Dknoy1tCRt5gqpxhHDcsivjfvkh4hrv4g_h0LNJWtO88iigENi8MTvRImarZIRDE_Gbg_xSyK7rQ/p.png',
        },
        {
          id: 13,
          size: 'S',
          color: 'Red',
          inventory: 10,
          image:
            'https://uc31a0ac450a8683cda469e86b5f.previews.dropboxusercontent.com/p/thumb/ABv5h2DCUmprTWQ0bR0E7WpJnPh3SZ15xs1fpMYjVLvdTdKNGT2qUmx2w_0C9SFOK8D93TM16m1eAodgYFbRO1t3n3a0Kt8I9PKkx8Bcmou7a_6DYd1j8eLHVjAOPpkxh82mw8bxj4NuOy1to60be2YKYp-fjO1cntSGh2qwrowZC0_Mi_VEBnCXemrYXbfzJ0RyuS51ZD5kCcDf8qkof8RHm6uEFLlhTD8pMlB-aCKgPEXR1OBsvrYAOPqp13KO41_VmFfa6qJMxGsZCJ7iOQS9KMEBjHpfrHcYWkQeinbNjwOzBtlSJf0qCSehPCpOpMQeFfkFQMOgSx1UnyOeqJGMEvYcOxYq5w0t9dHaSj-SH0vpkNYx_Dr-xc9ihrZ29wE/p.png',
        },
        {
          id: 14,
          size: 'M',
          color: 'Red',
          inventory: 10,
          image:
            'https://uc31a0ac450a8683cda469e86b5f.previews.dropboxusercontent.com/p/thumb/ABv5h2DCUmprTWQ0bR0E7WpJnPh3SZ15xs1fpMYjVLvdTdKNGT2qUmx2w_0C9SFOK8D93TM16m1eAodgYFbRO1t3n3a0Kt8I9PKkx8Bcmou7a_6DYd1j8eLHVjAOPpkxh82mw8bxj4NuOy1to60be2YKYp-fjO1cntSGh2qwrowZC0_Mi_VEBnCXemrYXbfzJ0RyuS51ZD5kCcDf8qkof8RHm6uEFLlhTD8pMlB-aCKgPEXR1OBsvrYAOPqp13KO41_VmFfa6qJMxGsZCJ7iOQS9KMEBjHpfrHcYWkQeinbNjwOzBtlSJf0qCSehPCpOpMQeFfkFQMOgSx1UnyOeqJGMEvYcOxYq5w0t9dHaSj-SH0vpkNYx_Dr-xc9ihrZ29wE/p.png',
        },
        {
          id: 15,
          size: 'L',
          color: 'Red',
          inventory: 10,
          image:
            'https://uc31a0ac450a8683cda469e86b5f.previews.dropboxusercontent.com/p/thumb/ABv5h2DCUmprTWQ0bR0E7WpJnPh3SZ15xs1fpMYjVLvdTdKNGT2qUmx2w_0C9SFOK8D93TM16m1eAodgYFbRO1t3n3a0Kt8I9PKkx8Bcmou7a_6DYd1j8eLHVjAOPpkxh82mw8bxj4NuOy1to60be2YKYp-fjO1cntSGh2qwrowZC0_Mi_VEBnCXemrYXbfzJ0RyuS51ZD5kCcDf8qkof8RHm6uEFLlhTD8pMlB-aCKgPEXR1OBsvrYAOPqp13KO41_VmFfa6qJMxGsZCJ7iOQS9KMEBjHpfrHcYWkQeinbNjwOzBtlSJf0qCSehPCpOpMQeFfkFQMOgSx1UnyOeqJGMEvYcOxYq5w0t9dHaSj-SH0vpkNYx_Dr-xc9ihrZ29wE/p.png',
        },
        {
          id: 16,
          size: 'XL',
          color: 'Red',
          inventory: 10,
          image:
            'https://uc31a0ac450a8683cda469e86b5f.previews.dropboxusercontent.com/p/thumb/ABv5h2DCUmprTWQ0bR0E7WpJnPh3SZ15xs1fpMYjVLvdTdKNGT2qUmx2w_0C9SFOK8D93TM16m1eAodgYFbRO1t3n3a0Kt8I9PKkx8Bcmou7a_6DYd1j8eLHVjAOPpkxh82mw8bxj4NuOy1to60be2YKYp-fjO1cntSGh2qwrowZC0_Mi_VEBnCXemrYXbfzJ0RyuS51ZD5kCcDf8qkof8RHm6uEFLlhTD8pMlB-aCKgPEXR1OBsvrYAOPqp13KO41_VmFfa6qJMxGsZCJ7iOQS9KMEBjHpfrHcYWkQeinbNjwOzBtlSJf0qCSehPCpOpMQeFfkFQMOgSx1UnyOeqJGMEvYcOxYq5w0t9dHaSj-SH0vpkNYx_Dr-xc9ihrZ29wE/p.png',
        },
      ],
    },
    {
      title: 'Mim Hat',
      images: [
        'https://ucc1cb97f5163fcfd6fd53108578.previews.dropboxusercontent.com/p/thumb/ABtMuUc-x5AOdagS7De3laO5-pkWneAAn2u4vNVjT1L102qOxu-yLCWMEoxjAViKN5FA2UyoT0zFfEJvxkwuqXMsnjhs4fcOlKLYXOY95nNGHAzLNTJoMRSWCYFdGLPYryls5F07Oy_eKSqMVssY9pQrsqeSFQfQ4cZVokfe3r95v_ChvMGuszeeAgVNtN_jxWOuXtAbRFZM9PdPD6vpsZ1VZTyroU2otZxrAYjRGmckE977vNkVhnvcA9zGltFs2hWaGK09Wp65nEJxv0-_UXUmmpHM2Gx1TF9dj6DEUjPeWNnZqc7bBiTbIV8lwmLnjrD6HwvBGROBv6AF7hSzJDvQ0ltV0N3dL21DJ9Du5D0S3NN2Jrn9wriY1X8evEiHZKE/p.png',
      ],
      description: 'Imitation is the sincerest form of flattery',
      category: 'Hats',
      price: 100,
      compare_at_price: 120,
      vendor: 'weBoot',
      tags: ['Hats', 'Headwear', 'Straw', 'Summer', 'Beach', 'Garden'],
      reviews: [{ rating: 4, body: 'This is a great hat!' }],
      upc: Math.floor(Math.random() * 1000000000),
      variants: [
        {
          id: 17,
          size: 'OSFM',
          color: 'Red',
          inventory: 100,
          image: '/assets/images/mim-hat.png',
        },
      ],
    },
    {
      title: 'React Hat',
      images: [
        'https://ucde025452f5ff3b06e34442257b.previews.dropboxusercontent.com/p/thumb/ABt_rxsW4FZ3x3MDd1ySAdZtoYaqVDWYYUzJwZz2-sAAhMpVnK7PhDGhOtQ7kKSubk7JdmDeJC0JuS6q-jAEcT-alt3gh_f4USgWWdHa8FyFQBiPxmZk_lkGdJr6jd39GB77nH9StCRV6hn2ofiKqBTtPJrffOZvdTeUHLryEsEm9-5DLRN-MmfL_-bAXIIIRA8_3HjJ9l9TxzdXF68pLvBVC3VoPQIUqHD3W7fjzsJ9nz-tQV3Cs9-FXjKdVrFLmY03IRREzZdCydVm6HnRjJ2hcN1_ZrOGvLwu8lEltTkaXu7De5Bar9KVPZNnSKGtvFgDa3kn2st_nyz9zOrQ3jl95bzs33mgBm56aNKF2SydyS-9q-lFF3-wgI6rAeilDF8/p.png',
      ],
      description: 'React Hat',
      category: 'Hats',
      price: 10,
      compare_at_price: 13,
      vendor: 'weBoot',
      tags: ['Hats', 'Headwear', 'React'],
      reviews: [{ rating: 4, body: 'This is a great hat!' }],
      upc: Math.floor(Math.random() * 1000000000),
      variants: [
        {
          id: 18,
          size: 'OSFM',
          color: 'Grey',
          inventory: 30,
          image:
            'https://ucde025452f5ff3b06e34442257b.previews.dropboxusercontent.com/p/thumb/ABt_rxsW4FZ3x3MDd1ySAdZtoYaqVDWYYUzJwZz2-sAAhMpVnK7PhDGhOtQ7kKSubk7JdmDeJC0JuS6q-jAEcT-alt3gh_f4USgWWdHa8FyFQBiPxmZk_lkGdJr6jd39GB77nH9StCRV6hn2ofiKqBTtPJrffOZvdTeUHLryEsEm9-5DLRN-MmfL_-bAXIIIRA8_3HjJ9l9TxzdXF68pLvBVC3VoPQIUqHD3W7fjzsJ9nz-tQV3Cs9-FXjKdVrFLmY03IRREzZdCydVm6HnRjJ2hcN1_ZrOGvLwu8lEltTkaXu7De5Bar9KVPZNnSKGtvFgDa3kn2st_nyz9zOrQ3jl95bzs33mgBm56aNKF2SydyS-9q-lFF3-wgI6rAeilDF8/p.png',
        },
      ],
    },
    {
      title: 'Beanie',
      images: [
        'https://ucb2ac22ecbb4c3abca11cde247b.previews.dropboxusercontent.com/p/thumb/ABtRRJXtDTFAXXidaBg9xN7U8w0r46wzpVTd4DPTL60z9qFCd7M87NUNwxOj98bh-ALN44CfYJtGVJJg8qU58yKsa3abahC-AvMwQwhn9A481ZlSIr92zFS6U30aF4Os5NOcI_OyH97j7JaRGrfj2_AgXK2ccQrhivbn2jD68H1xtLKPsWYuZkCAw-cNwVSCvdZoKpzaYMVS0ldX57-jMwQZdF2wBJ1a8VHARHjvuvu_Keiu8ePUff85SMIQx9CXZnrsM_y_Yr5j270RwIKURQYW3_s64b8hp84O5ho7mdk2r1jS9MCL2xKBzfYPXn2YCVSfgEdE4eCFLXNd7xWmKC6gMdTQ4WBDme0v5Lh0OwLNYXeCqhHmw1oU2cAGpY9XVrg/p.png',
      ],
      description: 'Meme beanie',
      category: 'Hats',
      price: 15,
      compare_at_price: 20,
      vendor: 'weBoot',
      tags: ['Hats', 'Headwear', 'React', 'Funny'],
      reviews: [{ rating: 4, body: 'This is a great hat!' }],
      upc: Math.floor(Math.random() * 1000000000),
      variants: [
        {
          id: 19,
          size: 'OSFM',
          color: 'Grey',
          inventory: 30,
          image:
            'https://ucb2ac22ecbb4c3abca11cde247b.previews.dropboxusercontent.com/p/thumb/ABtRRJXtDTFAXXidaBg9xN7U8w0r46wzpVTd4DPTL60z9qFCd7M87NUNwxOj98bh-ALN44CfYJtGVJJg8qU58yKsa3abahC-AvMwQwhn9A481ZlSIr92zFS6U30aF4Os5NOcI_OyH97j7JaRGrfj2_AgXK2ccQrhivbn2jD68H1xtLKPsWYuZkCAw-cNwVSCvdZoKpzaYMVS0ldX57-jMwQZdF2wBJ1a8VHARHjvuvu_Keiu8ePUff85SMIQx9CXZnrsM_y_Yr5j270RwIKURQYW3_s64b8hp84O5ho7mdk2r1jS9MCL2xKBzfYPXn2YCVSfgEdE4eCFLXNd7xWmKC6gMdTQ4WBDme0v5Lh0OwLNYXeCqhHmw1oU2cAGpY9XVrg/p.png',
        },
      ],
    },
    {
      title: 'Git Sweat Pants',
      images: [
        'https://uc864ea72095dba9560de9359ab1.previews.dropboxusercontent.com/p/thumb/ABsEEQunUgO3YxVIKPd8t57WGu7UHYGeynK-6Bg9A2yFXZ4zo69a7vKZ3LG1scF9xeRuZW3vEjlsmm72RcRaDffL7HtqooLF0hzw1_bQSQKyWxyeZeHWeRwIGZ4Y5AsGKd5KJwwCSIITjlQjetxwU8OJmlH-B2kbiQ37hO0MfFg4JtjSVdJkfARMt1BxBys9WMxO7cF9_7P-ifIkOwCsebfWeMYfv0VWRWssO-bdJ9GaVsRLn792psXxJIfDflELuqnwdVQorwtMkgX9f47_pQc7AHUr7WfeSId6XE0UqlrUxrZlewP-Lz8lZa7um6JAwfwlpKBfu5w2ObCUQjW_8uaeRqGhYHMnBscoQ90C1-AzXG0EyZldHL8UZZKIcfkLqb4/p.png',
      ],
      description: 'Comfy Cotton Sweat Pants',
      category: 'Pants',
      quantity: 30,
      price: 40,
      compare_at_price: null,
      vendor: 'weBoot',
      tags: ['Sweat', 'Pants', 'Cotton', 'Bottom', 'Graphic'],
      reviews: [{ rating: 3, body: 'This is a great shirt!' }],
      upc: Math.floor(Math.random() * 1000000000),
      variants: [
        {
          id: 20,
          size: 'S',
          color: 'Purple',
          inventory: 10,
          image:
            'https://uc864ea72095dba9560de9359ab1.previews.dropboxusercontent.com/p/thumb/ABsEEQunUgO3YxVIKPd8t57WGu7UHYGeynK-6Bg9A2yFXZ4zo69a7vKZ3LG1scF9xeRuZW3vEjlsmm72RcRaDffL7HtqooLF0hzw1_bQSQKyWxyeZeHWeRwIGZ4Y5AsGKd5KJwwCSIITjlQjetxwU8OJmlH-B2kbiQ37hO0MfFg4JtjSVdJkfARMt1BxBys9WMxO7cF9_7P-ifIkOwCsebfWeMYfv0VWRWssO-bdJ9GaVsRLn792psXxJIfDflELuqnwdVQorwtMkgX9f47_pQc7AHUr7WfeSId6XE0UqlrUxrZlewP-Lz8lZa7um6JAwfwlpKBfu5w2ObCUQjW_8uaeRqGhYHMnBscoQ90C1-AzXG0EyZldHL8UZZKIcfkLqb4/p.png',
        },
        {
          id: 21,
          size: 'M',
          color: 'Purple',
          inventory: 10,
          image:
            'https://uc864ea72095dba9560de9359ab1.previews.dropboxusercontent.com/p/thumb/ABsEEQunUgO3YxVIKPd8t57WGu7UHYGeynK-6Bg9A2yFXZ4zo69a7vKZ3LG1scF9xeRuZW3vEjlsmm72RcRaDffL7HtqooLF0hzw1_bQSQKyWxyeZeHWeRwIGZ4Y5AsGKd5KJwwCSIITjlQjetxwU8OJmlH-B2kbiQ37hO0MfFg4JtjSVdJkfARMt1BxBys9WMxO7cF9_7P-ifIkOwCsebfWeMYfv0VWRWssO-bdJ9GaVsRLn792psXxJIfDflELuqnwdVQorwtMkgX9f47_pQc7AHUr7WfeSId6XE0UqlrUxrZlewP-Lz8lZa7um6JAwfwlpKBfu5w2ObCUQjW_8uaeRqGhYHMnBscoQ90C1-AzXG0EyZldHL8UZZKIcfkLqb4/p.pngg',
        },
        {
          id: 22,
          size: 'L',
          color: 'Purple',
          inventory: 10,
          image:
            'https://uc864ea72095dba9560de9359ab1.previews.dropboxusercontent.com/p/thumb/ABsEEQunUgO3YxVIKPd8t57WGu7UHYGeynK-6Bg9A2yFXZ4zo69a7vKZ3LG1scF9xeRuZW3vEjlsmm72RcRaDffL7HtqooLF0hzw1_bQSQKyWxyeZeHWeRwIGZ4Y5AsGKd5KJwwCSIITjlQjetxwU8OJmlH-B2kbiQ37hO0MfFg4JtjSVdJkfARMt1BxBys9WMxO7cF9_7P-ifIkOwCsebfWeMYfv0VWRWssO-bdJ9GaVsRLn792psXxJIfDflELuqnwdVQorwtMkgX9f47_pQc7AHUr7WfeSId6XE0UqlrUxrZlewP-Lz8lZa7um6JAwfwlpKBfu5w2ObCUQjW_8uaeRqGhYHMnBscoQ90C1-AzXG0EyZldHL8UZZKIcfkLqb4/p.png',
        },
        {
          id: 23,
          size: 'XL',
          color: 'Purple',
          inventory: 10,
          image:
            'https://uc864ea72095dba9560de9359ab1.previews.dropboxusercontent.com/p/thumb/ABsEEQunUgO3YxVIKPd8t57WGu7UHYGeynK-6Bg9A2yFXZ4zo69a7vKZ3LG1scF9xeRuZW3vEjlsmm72RcRaDffL7HtqooLF0hzw1_bQSQKyWxyeZeHWeRwIGZ4Y5AsGKd5KJwwCSIITjlQjetxwU8OJmlH-B2kbiQ37hO0MfFg4JtjSVdJkfARMt1BxBys9WMxO7cF9_7P-ifIkOwCsebfWeMYfv0VWRWssO-bdJ9GaVsRLn792psXxJIfDflELuqnwdVQorwtMkgX9f47_pQc7AHUr7WfeSId6XE0UqlrUxrZlewP-Lz8lZa7um6JAwfwlpKBfu5w2ObCUQjW_8uaeRqGhYHMnBscoQ90C1-AzXG0EyZldHL8UZZKIcfkLqb4/p.png',
        },
      ],
    },
  ]);
  console.log('products seeded');
  // await User.deleteMany();

  process.exit();
});
