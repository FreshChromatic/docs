import { redirect } from 'next/navigation';

export { metadata } from '../../(home)/page';

export default function TraditionalChineseHomePage() {
  redirect('/zh_tw/chunkrevive/getting-started');
}
