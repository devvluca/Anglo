/**
 * Script para corrigir posts sem o campo 'published' setado
 * Execute isso no console do navegador ou como um script Node.js
 */

// Se você estiver rodando no navegador com Supabase disponível:
// Cole isso no console do DevTools (F12)

(async () => {
  // Importar Supabase (já deve estar disponível no app)
  const { supabase } = window;
  
  if (!supabase) {
    console.error('❌ Supabase não está disponível. Certifique-se que o app está rodando.');
    return;
  }

  console.log('🔄 Iniciando correção de posts...');

  try {
    // 1. Buscar TODOS os posts (incluindo os sem 'published')
    const { data: allPosts, error: fetchError } = await supabase
      .from('blog_posts')
      .select('id, published, title')
      .order('created_at', { ascending: false });

    if (fetchError) {
      console.error('❌ Erro ao buscar posts:', fetchError);
      return;
    }

    console.log(`📊 Total de posts encontrados: ${allPosts.length}`);

    // 2. Filtrar posts que não têm 'published' ou estão como null/false
    const postsToUpdate = allPosts.filter(post => !post.published);
    console.log(`🔧 Posts a atualizar: ${postsToUpdate.length}`);

    if (postsToUpdate.length === 0) {
      console.log('✅ Todos os posts já têm published = true');
      return;
    }

    // 3. Atualizar todos os posts que precisam
    const { error: updateError } = await supabase
      .from('blog_posts')
      .update({ published: true })
      .is('published', null);

    if (updateError) {
      console.error('❌ Erro ao atualizar posts:', updateError);
      return;
    }

    console.log('✅ Posts atualizados com sucesso!');
    console.log(`✨ ${postsToUpdate.length} posts agora estão com published = true`);

    // 4. Recarregar a página
    setTimeout(() => {
      console.log('🔄 Recarregando página...');
      window.location.reload();
    }, 1000);

  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
})();
