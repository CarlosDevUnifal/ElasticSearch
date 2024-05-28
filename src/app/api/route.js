// import { Client } from '@elastic/elasticsearch';

// const esClient = new Client({ node: 'http://localhost:9200' });

// export async function GET(query) {
//     try {
//         const { body } = await esClient.search({
//             index: 'wikipedia',
//             from: 0,
//             size: 10,
//             body: {
//                 query: {
//                     match: {
//                         content: query
//                     }
//                 }
//             }
//         });

//         return body.hits.hits.map(hit => ({
//             abs: treatContent(hit._source.content),
//             title: hit._source.title,
//             url: hit._source.url
//         }));
//     } catch (error) {
//         throw new Error(error.message);
//     }
// }

// function treatContent(content) {
//     content = content.replace(/<\/?(som|math)\d*>/g, "");
//     content = content.replace(/[^A-Za-z\s]+/g, "");
//     content = content.replace(/\s+/g, " ");
//     content = content.replace(/^\s+/, "");
//     return content;
// }
