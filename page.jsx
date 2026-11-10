"use client";

import { useMemo, useState } from "react";

const questions = [
  { q: "Hiện thực lịch sử được hiểu là gì?", a: ["Những câu chuyện truyền miệng được lưu giữ trong cộng đồng qua nhiều thế hệ.", "Toàn bộ những gì đã diễn ra trong quá khứ, tồn tại khách quan, độc lập với con người.", "Những hiểu biết, nhận thức của con người về các sự kiện đã diễn ra trong quá khứ.", "Những công trình nghiên cứu khoa học lịch sử được công bố trong đời sống xã hội."], correct: 1 },
  { q: "Đối tượng nghiên cứu cơ bản và chủ yếu của Sử học là gì?", a: ["Toàn bộ quá khứ của loài người.", "Sự vận động của các hiện tượng tự nhiên qua các thời kì.", "Hoạt động sáng tạo nghệ thuật của con người trong đời sống hiện tại.", "Sự biến đổi của các hệ thống ngôn ngữ trong quá trình giao tiếp xã hội."], correct: 0 },
  { q: "Nguồn sử liệu nào sau đây thuộc nhóm sử liệu hiện vật?", a: ["Một bài nghiên cứu khoa học về đời sống cư dân thời cổ đại.", "Một câu chuyện truyền thuyết được kể lại qua nhiều thế hệ.", "Một chiếc trống đồng được tìm thấy trong cuộc khai quật khảo cổ học.", "Một bản ghi chép chữ viết về phong tục tập quán trong quá khứ."], correct: 2 },
  { q: "Ngành khoa học nào sau đây chuyên nghiên cứu về di tích, di vật và dấu tích vật chất của cư dân cổ xưa?", a: ["Khảo cổ học.", "Kinh tế học.", "Ngôn ngữ học.", "Tâm lí học."], correct: 0 },
  { q: "Văn hóa được khái quát là gì?", a: ["Hệ thống các cơ quan quản lý nhà nước và đô thị cổ đại.", "Tổng thể những giá trị vật chất và tinh thần do con người sáng tạo ra trong lịch sử.", "Những thành tựu khoa học - kĩ thuật chỉ xuất hiện ở thời kì hiện đại.", "Hệ thống các công trình kiến trúc tôn giáo lớn của nhân loại."], correct: 1 },
  { q: "Tiêu chuẩn cơ bản để nhận diện các nền văn minh là gì?", a: ["Nhà nước, đô thị, chữ viết và tiến bộ về tổ chức xã hội.", "Sự phát triển mạnh mẽ của thương mại đường biển và tiền tệ.", "Sự thống trị tuyệt đối của tôn giáo đối với đời sống con người.", "Quy mô dân số lớn và lãnh thổ mở rộng xuyên lục địa."], correct: 0 },
  { q: "Cư dân Ai Cập cổ đại đã sớm sáng tạo ra loại chữ viết nào vào khoảng hơn 3000 năm TCN?", a: ["Chữ giáp cốt.", "Chữ tượng hình.", "Chữ hình nêm.", "Chữ Phạn (Sanskrit)."], correct: 1 },
  { q: "Dòng sông nào là cái nôi gắn liền với sự hình thành và phát triển của nền văn minh Ai Cập cổ đại?", a: ["Sông Hoàng Hà.", "Sông Trường Giang.", "Sông Nin.", "Sông Hằng."], correct: 2 },
  { q: "Tôn giáo nào có nguồn gốc từ Ấn Độ cổ - trung đại và được truyền bá rộng rãi ra nhiều nước trên thế giới?", a: ["Nho giáo.", "Đạo giáo.", "Phật giáo.", "Hồi giáo."], correct: 2 },
  { q: "Loại hình kiến trúc nào là biểu tượng tiêu biểu nhất của văn minh Ai Cập cổ đại?", a: ["Vạn Lý Trường Thành.", "Kim tự tháp.", "Đền thờ Pát-tê-nông.", "Cung điện Ta-giơ Ma-gan."], correct: 1 },
  { q: "Chữ viết cổ nhất của Trung Hoa từ thời nhà Thương được tìm thấy trên mai rùa, xương thú được gọi là gì?", a: ["Chữ giáp cốt.", "Chữ Bra-mi.", "Chữ Kha-rốt-thi.", "Chữ Phê-ni-xi."], correct: 0 },
  { q: "Bốn phát minh kĩ thuật lớn của văn minh Trung Hoa thời cổ - trung đại gồm có:", a: ["Giấy, in, thuốc súng, la bàn.", "Luyện sắt, đúc đồng, làm gốm, dệt lụa.", "Xe ngựa, thuyền buồm, kính thiên văn, la bàn.", "La bàn, giấy, bản đồ số, thuốc súng."], correct: 0 },
  { q: "Sử liệu nào sau đây thuộc nhóm sử liệu chữ viết?", a: ["Một chiếc rìu đá cổ.", "Một bản sắc phong, văn bia được lưu giữ.", "Một điệu múa dân gian truyền thống.", "Dấu tích nền móng của một thành cổ."], correct: 1 },
  { q: "Hiện nay, giải pháp cấp bách hàng đầu trong việc bảo tồn và phát huy giá trị di sản văn hóa là gì?", a: ["Tuyên truyền, giáo dục ý thức bảo tồn di sản.", "Tăng cường đầu tư cơ sở vật chất hiện đại.", "Tăng cường các biện pháp bảo vệ di sản.", "Xử lý nghiêm về vi phạm các giá trị di sản."], correct: 0 },
  { q: "Các học thuyết như Nho giáo, Đạo giáo, Pháp gia... thuộc về thành tựu tiêu biểu nào của văn minh Trung Hoa?", a: ["Tư tưởng, tôn giáo.", "Khoa học tự nhiên.", "Kĩ thuật quân sự.", "Kiến trúc và điêu khắc."], correct: 0 },
  { q: "Bộ sử thi nổi tiếng nào sau đây thuộc thành tựu văn học của văn minh Ấn Độ cổ - trung đại?", a: ["Iliad và Odyssey.", "Ma-ha-bha-ra-ta và Ra-ma-y-a-na.", "Tam quốc diễn nghĩa.", "Tây du kí."], correct: 1 },
  { q: "Yếu tố tạo ra đặc tính, bản sắc của một xã hội hoặc nhóm người trong xã hội là", a: ["văn học.", "văn hóa.", "văn tự.", "văn minh."], correct: 1 },
  { q: "Hệ thống chữ viết cổ nhất của người Ai Cập được gọi là", a: ["chữ tượng thanh.", "chữ tượng hình.", "chữ tượng ý.", "Chữ cái Rô-ma."], correct: 1 },
  { q: "Yếu tố nào sau đây không phải là tiêu chuẩn nhận diện văn minh?", a: ["Nhà nước.", "Đô thị.", "Chữ viết.", "Tục lệ truyền miệng qua các bộ lạc."], correct: 3 },
  { q: "Đâu là một trong những thành tựu về y học của cư dân Ấn Độ cổ đại?", a: ["Biết giải phẫu cơ thể người và có nhiều ghi chép về bệnh lý học.", "Phát minh ra phương pháp châm cứu bằng kim loại.", "Chế tạo thành công thuốc gây tê toàn thân từ thảo dược.", "Sáng tạo ra hệ thống chữ số thập phân dùng trong y học."], correct: 0 },
  { q: "Loại hình kiến trúc tiêu biểu nhất của người Ai Cập cổ đại là", a: ["Tháp Thạt Luổng.", "các kim tự tháp.", "Đấu trường Rô-ma.", "Vạn lí trường thành."], correct: 1 },
  { q: "Quốc gia Trung Hoa ngày nay nằm ở khu vực nào trên thế giới?", a: ["Châu Á.", "Châu Âu.", "Châu Phi.", "Châu Mĩ."], correct: 0 },
  { q: "Mối quan hệ giữa văn hóa và văn minh được thể hiện phù hợp nhất qua nhận định nào?", a: ["Văn hóa và văn minh là hai khái niệm hoàn toàn tách rời, không có điểm chung.", "Văn minh xuất hiện trước, sau đó mới sản sinh ra các giá trị văn hóa.", "Văn hóa là nền tảng; văn minh là những giá trị phát triển cao của xã hội ở một trình độ nhất định.", "Văn hóa chỉ bao gồm vật chất, còn văn minh chỉ bao gồm các giá trị tinh thần."], correct: 2 },
  { q: "Những chủ dân đầu tiên xây dựng nền văn minh Trung Hoa cổ đại là", a: ["người Hoa - Hạ.", "người Việt.", "người Đra-vi-đa.", "người Mãn."], correct: 0 },
  { q: "Việc cư dân phương Đông cổ đại sớm phát triển các ngành toán học và thiên văn học xuất phát từ nguyên nhân thực tiễn nào?", a: ["Nhu cầu tính toán thời gian, làm lịch để phục vụ hoạt động sản xuất nông nghiệp.", "Yêu cầu phải đo đạc toàn bộ diện tích của các châu lục trên Trái Đất.", "Mong muốn tìm kiếm các hành tinh mới ngoài Thái Dương Hệ.", "Phục vụ cho việc giao thương hàng hải xuyên đại dương."], correct: 0 },
  { q: "Việc xây dựng các công trình kiến trúc đồ sộ như Kim tự tháp ở Ai Cập cổ đại phản ánh điều kiện xã hội và trình độ nào?", a: ["Cư dân đã ứng dụng các thiết bị cơ giới hiện đại vào xây dựng.", "Trình độ toán học, kĩ thuật xây dựng cao và khả năng tổ chức lao động quy mô lớn.", "Đời sống của mọi tầng lớp nhân dân đều cực kỳ sung túc và bình đẳng.", "Nền kinh tế Ai Cập hoàn toàn dựa vào thủ công nghiệp đô thị."], correct: 1 },
  { q: "Đâu là khái niệm văn minh của loài người?", a: ["Là sự tiến bộ về vật chất và tinh thần.", "Là sự phát triển rất cao về giáo dục và văn hóa.", "Là sự đi đầu của cuộc cách mạng khoa học công nghệ.", "Là sự chuyển hóa thành công từ vượn thành người"], correct: 0 },
  { q: "Ý nghĩa của các thành tựu văn minh Ấn Độ cổ - trung đại đối với nhân loại là gì?", a: ["Đặt nền móng duy nhất cho sự phát triển của văn minh phương Tây hiện đại.", "Cung cấp hệ thống chữ viết tượng hình cổ nhất cho nhân loại.", "Đóng góp vào kho tàng tri thức nhân loại (tôn giáo, toán học, văn học) và ảnh hưởng sâu rộng đến nhiều quốc gia, đặc biệt là Đông Nam Á.", "Xóa bỏ hoàn toàn sự tồn tại của các nền văn minh bản địa khác."], correct: 2 },
  { q: "Vì sau các nền văn minh ở phương Đông ra đời sớm, khoảng nửa sau thiên niên kỉ thứ IV TCN?", a: ["Vì phương Đông là nơi phát sinh nguồn gốc loài người.", "Có khí hậu nhiệt đới gió mùa, thích hợp trồng cây lúa nước.", "Có đường bờ biển dài, thuận lợi để buôn bán đường biển phát triển.", "Đất đai màu mở, phì nhiêu, thuận lợi để phát triển nông nghiệp."], correct: 3 },
  { q: "Do đâu, Ai Cập trở thành nên giao lưu giữa các dòng văn hóa từ châu Á, châu Phi, châu Âu ?", a: ["Nền văn minh Ai Cập ra đời rất sớm.", "Buôn bán đường biển rất phát triển.", "Vị trí tiếp giáp giáp giữa các châu lục.", "Hai bờ sông Nin có nhiều làng mạc."], correct: 2 },
  { q: "Sự truyền bá các thành tựu văn minh Trung Hoa (như chữ Hán, Nho giáo, các phát minh kĩ thuật) sang các nước láng giềng chứng minh điều gì?", a: ["Sự cô lập hoàn toàn giữa văn hóa phương Đông và phương Tây.", "Mối liên hệ giao lưu văn hóa, tri thức và ảnh hưởng mạnh mẽ của văn minh Trung Hoa trong khu vực.", "Các quốc gia láng giềng không có khả năng tự sáng tạo ra văn hóa.", "Sự đồng nhất hoàn toàn về mặt chính trị giữa các quốc gia Đông Á."], correct: 1 },
  { q: "Đặc trưng nổi bật nhất của xã hội Ấn Độ thời cổ-trung đại là sự tồn tại", a: ["gia đình mẫu hệ.", "giàu-nghèo.", "chế độ đẳng cấp.", "chế độ tư hữu."], correct: 2 },
  { q: "Yếu tố nào là cơ sở để người Ấn Độ sáng tạo nên chữ viết San - xcrít", a: ["Chữ giáp cốt và chữ Hán.", "Chữ tượng hình và chữ Phê-ni-xi.", "Chữ Kha-rốt-thi và chữ Bra-mi.", "Chữ viết Hy Lạp và chữ số La Mã."], correct: 2 },
  { q: "Yếu tố cơ bản của nền văn minh Trung Hoa thời cổ-trung đại là ngành", a: ["thủ công nghiệp.", "chăn nuôi.", "nông nghiệp.", "thương nghiệp."], correct: 2 },
  { q: "Từ rất sớm, các thuyết tư tưởng, tôn giáo ra đời ở Trung Hoa với mục đích gì?", a: ["Hướng con người đến cái thiện, tránh cái ác.", "Giải thích về thế giới và các biện pháp cai trị đất nước.", "Giáo dục con người yêu quê hương, đất nước.", "Giải thích sự ra đời của con người trên thế giới."], correct: 1 },
  { q: "So với những nền văn minh ở phương Tây, các nền văn minh ở phương Đông ra đời", a: ["muộn hơn.", "sớm hơn.", "cùng thời gian.", "cùng khu vực địa lí."], correct: 1 },
  { q: "Điểm giống và nổi bật của nền văn minh Ai Cập với các nền văn minh hình thành ở các khu vực khác ở phương Đông về", a: ["đất đai thích hợp trồng các loại cây lâu năm.", "đều hình thành trên lưu vực sông lớn.", "địa hình nhiều núi và cao nguyên.", "điều kiện thuận lợi cho buôn bán đường biển."], correct: 1 },
  { q: "Nhận định nào dưới đây phản ánh đúng nhất về mối quan hệ giữa công tác bảo tồn di sản với sự phát triển kinh tế - xã hội địa phương?", a: ["Bảo tồn di sản chỉ tốn kém ngân sách nhà nước mà không đem lại lợi ích kinh tế gì.", "Bảo tồn tốt di sản văn hóa, thiên nhiên là nguồn tài nguyên quan trọng để phát triển du lịch, thúc đẩy tăng trưởng kinh tế và giải quyết việc làm cho địa phương.", "Phát triển kinh tế phải đi đôi với việc san lấp các di tích lịch sử để lấy diện tích xây dựng đô thị.", "Di sản thiên nhiên và di sản văn hóa không có mối liên hệ nào với các hoạt động kinh tế."], correct: 1 },
  { q: "Đâu là một trong bốn phá minh lớn của người Trung Hoa vào thời cổ-trung địa và thế giới vẫn còn tiếp tục sử dụng đến ngày nay?", a: ["Phát minh ra la bàn.", "Chế tạo bê tông.", "Nêu ra thuyết nguyên tử.", "Giỏi về giải phẩu người."], correct: 0 },
  { q: "Đâu không phải là thành tựu về toán học của người Trung Hoa thời cổ-trung đại đạt được?", a: ["Phát minh ra bàn tính.", "Sử dụng hệ số đếm thập phân.", "Tính được số pi tới 7 chữ số.", "Đã sử dụng phép tính cộng và trừ."], correct: 3 },
  { q: "Sự tiến bộ về vật chất và tinh thần của xã hội loài người đồng thời là trạng thái phát triển cao của nền văn hoá, khi xã hội loài người vượt qua trình độ của thời kì dã man gọi là", a: ["văn hóa.", "văn minh.", "nghệ thuật.", "khoa học."], correct: 1 },
  { q: "Về cơ bản, các nền văn minh của loài người xuất hiện vào thời điểm nào sau đây?", a: ["Khi loài người vừa xuất hiện.", "Nhà nước và chữ viết xuất hiện.", "Xuất hiện cách mạng công nghiệp.", "Công xã thị tộc mẫu hệ ra đời."], correct: 1 },
  { q: "Nội dung nào sau đây phản ánh đúng điểm tương đồng giữa văn hóa và văn minh?", a: ["Đều mang đậm bản sắc riêng của tộc người và có tính khép kín.", "Đều phản ánh những tiến bộ vượt bậc về khoa học học và kĩ thuật.", "Đều là những giá trị vật chất và tinh thần do con người sáng tạo nên.", "Đều bắt đầu xuất hiện khi con người biết sử dụng công cụ bằng sắt."], correct: 2 },
  { q: "Nội dung nào sau đây là một trong những khác biệt giữa văn minh so với văn hoá?", a: ["Ra đời trước văn hoá nhưng đồng thời tồn tại độc lập với văn hoá.", "Xuất hiện khi con người biết nghiên cứu chế tạo công cụ lao động.", "Xuất hiện song song đồng thời cùng với sự xuất hiện của loài người.", "Xuất hiện khi con người bước vào thời kì phát triển cao của xã hội."], correct: 3 },
  { q: "Vì sao các thành tựu văn minh phương Đông cổ đại (như lịch âm dương, hệ đếm thập phân, hình học sơ khai) lại có giá trị đặt nền móng to lớn cho văn minh nhân loại?", a: ["Vì chúng đáp ứng trực tiếp các nhu cầu sản xuất, quản lý xã hội và hình thành tư duy khoa học cơ bản đầu tiên.", "Vì chúng đã đạt đến đỉnh cao tuyệt đối, không một thời kỳ sau nào có thể vượt qua.", "Vì chúng được giữ bí mật tuyệt đối trong cung đình và không truyền bá ra bên ngoài.", "Vì chúng không liên quan đến thực tiễn mà hoàn toàn mang tính thần bí."], correct: 0 },
  { q: "Kim tự tháp là thành tựu tiêu biểu của văn minh Ai Cập cổ đại trên lĩnh vực nào sau đây?", a: ["Điêu khắc.", "Thiên văn học.", "Kiến trúc.", "Sử học."], correct: 2 },
  { q: "Việc cư dân Trung Hoa cổ đại sáng tạo ra 4 phát minh lớn (giấy, in, thuốc súng, la bàn) có tác động như thế nào đến lịch sử thế giới?", a: ["Chỉ phục vụ duy nhất cho nhu cầu nội bộ của triều đình nhà Minh và nhà Thanh.", "Góp phần làm thay đổi sâu sắc nền văn minh nhân loại, thúc đẩy sự phát triển của hàng hải, quân sự, giáo dục và khoa học toàn cầu.", "Gây ra sự tàn phá khủng khiếp, làm gián đoạn hoàn toàn sự tiến hóa của châu Âu.", "Không để lại bất kỳ ảnh hưởng nào ngoài lãnh thổ Trung Hoa."], correct: 1 },
  { q: "So với những nền văn minh phương Tây, các nền văn minh ở phương Đông ra đời", a: ["muộn hơn.", "cùng thời gian.", "sớm hơn.", "cùng khu vực địa lí."], correct: 2 },
  { q: "Văn học Ấn Độ trở thành nguồn cảm hứng không chỉ trong nước mà còn lan sang một số nơi khác trên thế giới, tiêu biểu là ở khu vực nào?", a: ["Phía Tây châu Âu.", "Đông Bắc Á.", "Đông Nam Á.", "Châu Đại Dương."], correct: 2 },
  { q: "Nhận định nào đúng về ý nghĩa những thành tựu của văn minh Ấn Độ thời cổ - trung đại?", a: ["Góp phần thúc đẩy chế độ phong kiến ra đời sớm nhất ở phương Đông.", "Là mối liên hệ về tri thức, khoa học,… giữa phương Đông và phương Tây.", "Là minh chứng cho sự ảnh hưởng của nền văn minh này đối với châu Âu.", "Đóng góp quan trọng vào kho tàng tri thức của nhân loại."], correct: 3 },
  { q: "Điểm giống nhau của nền văn minh Ai Cập với các nền văn minh khác hình thành ở phương Đông là", a: ["Đất đai thích hợp trồng các loại cây lâu năm.", "Đều hình thành trên lưu vực sông lớn.", "địa hình nhiều núi và cao nguyên.", "điều kiện tự nhiều núi và cao nguyên."], correct: 1 },
  { q: "Hai tôn giáo có ảnh hưởng sâu rộng hàng đầu của Ấn Độ là", a: ["Hin-đu giáo và Hồi giáo.", "Hin-đu giáo và Nho giáo.", "Phật giáo và Hồi giáo.", "Phật giáo và Hin-đu giáo."], correct: 3 },
  { q: "Nhận định nào đúng về ý nghĩa những thành tựu của văn minh Ấn Độ thời cổ - trung đại?", a: ["Góp phần thúc đẩy chế độ phong kiến ra đời sớm nhất ở phương Đông.", "Là mối liên hệ về tri thức, khoa học,… giữa phương Đông và phương Tây.", "Là minh chứng cho sự ảnh hưởng của nền văn minh này đối với châu Âu.", "Đóng góp quan trọng vào kho tàng tri thức của nhân loại."], correct: 3 },
  { q: "Nho gia, Đạo gia, Pháp gia là những thành tựu tiêu biểu của nền văn minh Trung Hoa cổ - trung đại trên lĩnh vực nào sau đây?", a: ["Tôn giáo.", "Tư tưởng.", "Văn học.", "Chữ viết."], correct: 1 },
  { q: "Nội dung nào sau đây là một trong những khác biệt giữa văn minh so với văn hoá?", a: ["Ra đời trước văn hoá nhưng đồng thời tồn tại độc lập với văn hoá.", "Xuất hiện khi con người biết nghiên cứu chế tạo công cụ lao động.", "Xuất hiện song song đồng thời cùng với sự xuất hiện của loài người.", "Xuất hiện khi con người bước vào thời kì phát triển cao của xã hội."], correct: 3 },
  { q: "Kim tự tháp là thành tựu tiêu biểu của văn minh Ai Cập cổ đại trên lĩnh vực nào sau đây?", a: ["Điêu khắc.", "Thiên văn học.", "Kiến trúc.", "Sử học."], correct: 2 },
  { q: "Từ khoảng hơn 3000 năm TCN, người Ai Cập đã sáng tạo ra một hệ thống chữ viết cổ nhất trên thế giới, gọi là chữ", a: ["tượng hình.", "tượng thanh.", "La-tinh.", "giáp cốt."], correct: 0 },
  { q: "Thành tựu nào sau đây là một phát minh lớn về kĩ thuật của nền văn minh Trung Hoa cổ - trung đại?", a: ["Máy tính điện tử.", "Kĩ thuật in.", "Động cơ hơi nước.", "Động cơ điện."], correct: 1 },
  { q: "Kĩ thuật làm giấy, kĩ thuật in, thuốc súng và la bàn là thành tựu rực rỡ của nền văn minh", a: ["Hy Lạp.", "Ấn Độ.", "Trung Hoa.", "Ai Cập."], correct: 2 },
  { q: "Phật giáo là thành tựu về tôn giáo của nền văn minh nào sau đây?", a: ["Ai Cập.", "Ấn Độ.", "Trung Hoa.", "La Mã."], correct: 1 },
];

const letters = ["A", "B", "C", "D"];

export default function QuizPage() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const score = useMemo(
    () => questions.reduce((total, item, index) => total + (answers[index] === item.correct ? 1 : 0), 0),
    [answers]
  );
  const answeredCount = Object.keys(answers).length;

  function choose(index, option) {
    if (submitted) return;
    setAnswers((current) => ({ ...current, [index]: option }));
  }

  function resetQuiz() {
    setAnswers({});
    setSubmitted(false);
    setShowAll(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="quiz-shell">
      <style jsx global>{`
        * { box-sizing: border-box; }
        body { margin: 0; background: #f3f6fb; color: #172033; font-family: Arial, Helvetica, sans-serif; }
        button { font: inherit; }
      `}</style>
      <header className="hero">
        <div className="hero-inner">
          <p className="eyebrow">ÔN TẬP KIỂM TRA GIỮA KÌ I</p>
          <h1>TRẮC NGHIỆM LỊCH SỬ 10</h1>
          <p className="sub">Năm học 2026 - 2027 · 60 câu hỏi</p>
          <div className="progress-wrap">
            <div className="progress-label"><span>Tiến độ làm bài</span><b>{answeredCount}/60 câu</b></div>
            <div className="progress"><span style={{ width: `${answeredCount / 60 * 100}%` }} /></div>
          </div>
        </div>
      </header>

      <section className="content">
        <div className="notice">
          <b>Hướng dẫn:</b> Chọn một đáp án A, B, C hoặc D cho mỗi câu. Nhấn “Nộp bài” để xem kết quả và đáp án đúng.
        </div>

        {questions.map((item, index) => {
          const selected = answers[index];
          return (
            <article className="question-card" key={index}>
              <div className="question-title">
                <span className="number">Câu {index + 1}</span>
                <span className="question-text">{item.q}</span>
              </div>
              <div className="options">
                {item.a.map((option, optionIndex) => {
                  const isSelected = selected === optionIndex;
                  const isCorrect = item.correct === optionIndex;
                  let stateClass = isSelected ? " selected" : "";
                  if (submitted && isCorrect) stateClass += " correct";
                  if (submitted && isSelected && !isCorrect) stateClass += " wrong";
                  return (
                    <button
                      type="button"
                      key={optionIndex}
                      className={`option${stateClass}`}
                      onClick={() => choose(index, optionIndex)}
                      disabled={submitted}
                    >
                      <span className="letter">{letters[optionIndex]}</span>
                      <span>{option}</span>
                      {submitted && isCorrect && <span className="mark">✓</span>}
                      {submitted && isSelected && !isCorrect && <span className="mark">✕</span>}
                    </button>
                  );
                })}
              </div>
              {submitted && selected === undefined && <p className="unanswered">Bạn chưa chọn đáp án câu này.</p>}
            </article>
          );
        })}

        <div className="submit-area">
          {!submitted ? (
            <>
              <p>Bạn đã trả lời <b>{answeredCount}/60</b> câu.</p>
              <button className="primary" onClick={() => { setSubmitted(true); setShowAll(true); }}>Nộp bài và xem kết quả</button>
            </>
          ) : (
            <div className="result">
              <p className="result-label">KẾT QUẢ CỦA BẠN</p>
              <div className="score">{score}<small>/60</small></div>
              <p>Đúng {score} câu · Sai hoặc chưa trả lời {60 - score} câu</p>
              <button className="primary" onClick={resetQuiz}>Làm lại bài</button>
              <button className="secondary" onClick={() => setShowAll((v) => !v)}>
                {showAll ? "Ẩn đáp án đúng" : "Xem đáp án đúng"}
              </button>
              {showAll && (
                <div className="answer-key">
                  <b>Bảng đáp án:</b>
                  <div className="key-grid">
                    {questions.map((item, index) => <span key={index}>Câu {index + 1}: <b>{letters[item.correct]}</b></span>)}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <footer>ĐỀ CƯƠNG ÔN TẬP GIỮA KÌ I · LỊCH SỬ 10</footer>

      <style jsx>{`
        .quiz-shell { min-height: 100vh; }
        .hero { background: linear-gradient(135deg, #123b70, #1766a8); color: white; padding: 42px 20px 34px; }
        .hero-inner { max-width: 900px; margin: auto; }
        .eyebrow { margin: 0 0 10px; letter-spacing: 2px; font-size: 12px; font-weight: 700; opacity: .85; }
        h1 { margin: 0; font-size: clamp(25px, 5vw, 40px); line-height: 1.15; }
        .sub { margin: 12px 0 26px; color: #d9e9fb; }
        .progress-wrap { max-width: 520px; }
        .progress-label { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 8px; }
        .progress { height: 8px; border-radius: 20px; background: #ffffff40; overflow: hidden; }
        .progress span { display: block; height: 100%; background: #7ee0bd; border-radius: 20px; transition: width .2s; }
        .content { max-width: 900px; margin: 24px auto; padding: 0 16px; }
        .notice { background: #e8f2ff; border: 1px solid #c8ddf7; padding: 15px 17px; border-radius: 12px; margin-bottom: 18px; line-height: 1.55; font-size: 14px; }
        .question-card { background: white; border: 1px solid #e4e9f1; border-radius: 14px; padding: 20px; margin-bottom: 14px; box-shadow: 0 3px 12px #19365b08; }
        .question-title { display: flex; gap: 12px; align-items: flex-start; line-height: 1.5; margin-bottom: 14px; }
        .number { flex: 0 0 auto; color: #155da0; background: #eaf3ff; font-weight: 700; font-size: 13px; padding: 5px 9px; border-radius: 7px; }
        .question-text { font-weight: 700; }
        .options { display: grid; gap: 9px; }
        .option { width: 100%; display: flex; align-items: flex-start; gap: 11px; text-align: left; padding: 11px 12px; border: 1px solid #e1e6ee; background: #fff; color: #263247; border-radius: 10px; cursor: pointer; line-height: 1.45; transition: .15s; }
        .option:hover:not(:disabled) { border-color: #5795d1; background: #f6faff; }
        .letter { flex: 0 0 25px; height: 25px; display: grid; place-items: center; border-radius: 50%; background: #eef1f6; color: #45536a; font-weight: 700; font-size: 12px; }
        .option.selected { border: 2px solid #2676bd; background: #eff7ff; padding: 10px 11px; }
        .option.correct { border: 2px solid #1a9b62; background: #edfff6; color: #126b45; padding: 10px 11px; }
        .option.wrong { border: 2px solid #d94c4c; background: #fff1f1; color: #a52b2b; padding: 10px 11px; }
        .option.correct .letter { background: #1a9b62; color: white; }
        .option.wrong .letter { background: #d94c4c; color: white; }
        .option:disabled { cursor: default; }
        .mark { margin-left: auto; font-weight: 800; }
        .unanswered { color: #a45a12; font-size: 13px; margin: 10px 0 0; }
        .submit-area { background: white; border: 1px solid #e4e9f1; border-radius: 14px; padding: 22px; text-align: center; margin: 22px 0 30px; }
        .submit-area p { color: #536176; }
        .primary, .secondary { border: 0; border-radius: 9px; padding: 12px 20px; font-weight: 700; cursor: pointer; margin: 5px; }
        .primary { background: #155da0; color: white; }
        .primary:hover { background: #104a80; }
        .secondary { background: #eaf1f8; color: #174c7b; }
        .result-label { letter-spacing: 1.5px; font-size: 12px; font-weight: 700; }
        .score { font-size: 54px; color: #155da0; font-weight: 800; line-height: 1.1; }
        .score small { font-size: 22px; color: #7a8798; }
        .answer-key { margin: 22px auto 0; max-width: 650px; text-align: left; border-top: 1px solid #e6ebf2; padding-top: 18px; }
        .key-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(105px, 1fr)); gap: 9px; margin-top: 12px; font-size: 13px; }
        .key-grid span { background: #f3f6fa; border-radius: 7px; padding: 8px; }
        footer { text-align: center; padding: 20px; color: #8290a3; font-size: 11px; letter-spacing: 1px; }
        @media (max-width: 600px) {
          .hero { padding: 32px 18px 27px; }
          .question-card { padding: 15px; }
          .question-title { flex-direction: column; gap: 8px; }
          .option { font-size: 14px; }
        }
      `}</style>
    </main>
  );
}
