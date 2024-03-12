
import { Container, PostForm } from "../components";
import { Loadingbar } from "../components/LoadingBar";
function AddPost() {
  return (
    <div className="py-8">
      <Loadingbar />
      <Container>
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
